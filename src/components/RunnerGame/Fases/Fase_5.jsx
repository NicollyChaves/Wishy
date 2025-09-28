// src/components/RunnerGame/Fase5.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_5.css";

import bg1 from "../../../assets/imagens/runner/Fundo.png";
import char1 from "../../../assets/imagens/runner/character1.png";
import char2 from "../../../assets/imagens/runner/character2.png";
import char3 from "../../../assets/imagens/runner/character3.png";
import char4 from "../../../assets/imagens/runner/character4.png";
import char5 from "../../../assets/imagens/runner/character5.png";
import logo from "../../../assets/imagens/runner/Logo.png";

// frases simples para montar
const simpleSentences = [
    { words: ["O", "gato", "bebe", "água"], order: ["O", "gato", "bebe", "água"] },
    { words: ["Ele", "come", "maçã"], order: ["Ele", "come", "maçã"] },
    { words: ["A", "bola", "rola"], order: ["A", "bola", "rola"] },
    { words: ["Ela", "vê", "o", "sol"], order: ["Ela", "vê", "o", "sol"] },
    { words: ["O", "menino", "corre"], order: ["O", "menino", "corre"] },
];

export default function Fase5({ onNext }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);

    const [currentSentence, setCurrentSentence] = useState(null);
    const [remainingOrder, setRemainingOrder] = useState([]); // palavras ainda a coletar, na ordem
    const [wordOptions, setWordOptions] = useState([]); // palavras que estão “voando” no momento
    const [position, setPosition] = useState("middle");
    const [showSelector, setShowSelector] = useState(true);
    const [finished, setFinished] = useState(false);

    const containerRef = useRef(null);

    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);
        spawnNextSentence(); // começar a primeira frase

        // spawn de novas opções de palavras a cada intervalo
        const spawn = setInterval(() => {
            if (!running) return;
            if (!currentSentence) {
                spawnNextSentence();
            } else {
                // se já estamos numa frase ativa, gerar opções de palavras dessa frase
                const opts = remainingOrder.map((w, idx) => ({
                    word: w,
                    lane: idx === 0 ? "top" : idx === 1 ? "middle" : "bottom",
                }));
                // embaralhar lanes para “obstáculos”
                setWordOptions(opts.sort(() => 0.5 - Math.random()));
            }
        }, 6000);

        setTimeout(() => {
            clearInterval(spawn);
            setRunning(false);
            setFinished(true);
        }, 40000);
    };

    const spawnNextSentence = () => {
        const random = simpleSentences[Math.floor(Math.random() * simpleSentences.length)];
        setCurrentSentence(random);
        setRemainingOrder([...random.order]);
        // gerar primeiras opções
        const opts = random.words.map((w, idx) => ({
            word: w,
            lane: idx === 0 ? "top" : idx === 1 ? "middle" : "bottom",
        })).sort(() => 0.5 - Math.random());
        setWordOptions(opts);
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (!running) return;
            if (e.key === "ArrowUp") setPosition("top");
            if (e.key === "ArrowDown") setPosition("bottom");
            if (e.key === "ArrowRight") setPosition("middle");
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [running]);

    useEffect(() => {
        if (!running || wordOptions.length === 0 || !currentSentence) return;
        const interval = setInterval(() => {
            wordOptions.forEach((opt) => {
                if (opt.lane === position) {
                    // se é a próxima palavra esperada na ordem
                    if (opt.word === remainingOrder[0]) {
                        setScore((prev) => prev + 10);
                        // remover essa palavra da lista de palavras restantes
                        setRemainingOrder((prev) => prev.slice(1));
                    } else {
                        // erro: coletou palavra fora de ordem
                        setScore((prev) => (prev > 0 ? prev - 5 : 0));
                    }
                    // limpar as opções, aguardar próximo spawn
                    setWordOptions([]);
                }
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [wordOptions, position, remainingOrder, running]);

    const onCharacterChosen = (char) => {
        setCharacter(char);
        setShowSelector(false);
    };

    return (
        <div className="runner-main" onClick={handleStart} ref={containerRef}>
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg1})` }} />

            {/* Logo fixa no topo direito */}
            <div className="logo-top">
                <img src={logo} alt="Logo Balão" />
            </div>

            {!finished && (
                <>
                    <div className="ui-top">
                        {running && <div className="btn reward-btn">⭐ Pontos: {score}</div>}
                    </div>

                    {running && currentSentence && (
                        <div className="current-word">
                            Monte a frase: <strong>{currentSentence.words.join(" ")}</strong>
                        </div>
                    )}

                    {character && (
                        <div className={`character-wrap ${position}`}>
                            <img
                                src={character.src}
                                alt={character.name}
                                className={`character ${running ? "run" : "idle"}`}
                            />
                        </div>
                    )}

                    {running &&
                        wordOptions.map((opt, i) => (
                            <div key={i} className={`letter ${opt.lane}`}>
                                {opt.word}
                            </div>
                        ))}

                    {!running && !showSelector && (
                        <div className="hint">Clique para começar a Fase 5</div>
                    )}

                    {showSelector && (
                        <div className="char-modal" onClick={() => setShowSelector(false)}>
                            <div className="char-card" onClick={(e) => e.stopPropagation()}>
                                <h2>Escolha seu personagem</h2>
                                <div className="char-list">
                                    {[char1, char2, char3, char4, char5].map((char, idx) => (
                                        <button
                                            key={idx}
                                            className="char-option"
                                            onClick={() => onCharacterChosen({ name: `Char${idx + 1}`, src: char })}
                                        >
                                            <img src={char} alt={`Char${idx + 1}`} />
                                            <span>Char {idx + 1}</span>
                                        </button>
                                    ))}
                                </div>
                                <button className="close" onClick={() => setShowSelector(false)}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {finished && (
                <div className="end-modal">
                    <div className="end-card">
                        <h2>🎉 Parabéns!</h2>
                        <p>Você concluiu a fase com {score} pontos!</p>
                        <button onClick={onNext}>Próxima Fase</button>
                    </div>
                </div>
            )}
        </div>
    );
}
