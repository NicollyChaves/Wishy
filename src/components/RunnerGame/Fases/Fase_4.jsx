// src/components/RunnerGame/Fase4.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_4.css";

import bg1 from "../../../assets/imagens/runner/Fundo.png";
import char1 from "../../../assets/imagens/runner/character1.png";
import char2 from "../../../assets/imagens/runner/character2.png";
import char3 from "../../../assets/imagens/runner/character3.png";
import char4 from "../../../assets/imagens/runner/character4.png";
import char5 from "../../../assets/imagens/runner/character5.png";
import logo from "../../../assets/imagens/runner/Logo.png";

// cenas com possíveis palavras
const scenes = [
    {
        name: "Cozinha",
        words: ["Fogão", "Árvore", "Cadeira"],
        correct: "Fogão",
    },
    {
        name: "Sala",
        words: ["Sofá", "Carro", "Mesa"],
        correct: "Sofá",
    },
    {
        name: "Parque",
        words: ["Balanço", "Banheiro", "Livro"],
        correct: "Balanço",
    },
    {
        name: "Quarto",
        words: ["Cama", "Geladeira", "Telefone"],
        correct: "Cama",
    },
    {
        name: "Jardim",
        words: ["Flor", "Fogão", "Livro"],
        correct: "Flor",
    },
];

export default function Fase4({ onNext }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [currentScene, setCurrentScene] = useState(null);
    const [wordOptions, setWordOptions] = useState([]);
    const [position, setPosition] = useState("middle");
    const [showSelector, setShowSelector] = useState(true);
    const [finished, setFinished] = useState(false);

    const containerRef = useRef(null);

    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);

        const spawn = setInterval(() => {
            const random = scenes[Math.floor(Math.random() * scenes.length)];
            setCurrentScene(random);

            // embaralhar opções de palavras
            const shuffled = [...random.words].sort(() => 0.5 - Math.random());
            setWordOptions(
                shuffled.map((w, idx) => ({
                    word: w,
                    lane: idx === 0 ? "top" : idx === 1 ? "middle" : "bottom",
                }))
            );
        }, 6000);

        setTimeout(() => {
            clearInterval(spawn);
            setRunning(false);
            setFinished(true);
        }, 40000);
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
        if (!running || !currentScene || wordOptions.length === 0) return;

        const interval = setInterval(() => {
            wordOptions.forEach((opt) => {
                if (opt.lane === position) {
                    if (opt.word === currentScene.correct) {
                        setScore((prev) => prev + 10);
                    } else {
                        setScore((prev) => (prev > 0 ? prev - 5 : 0));
                    }
                    setWordOptions([]); // limpar as opções para não dobrar pontos
                }
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [wordOptions, position, currentScene, running]);

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

                    {running && currentScene && (
                        <div className="current-word">
                            Cena: <strong>{currentScene.name}</strong>
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
                        <div className="hint">Clique para começar a Fase 4</div>
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
                        <p>Você completou a fase com {score} pontos!</p>
                        <button onClick={onNext}>Próxima Fase</button>
                    </div>
                </div>
            )}
        </div>
    );
}
