// src/components/RunnerGame/Fase_2.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_2.css";

import bg1 from "../../../assets/imagens/runner/Plano_fundo_2.jpg";
import char1 from "../../../assets/imagens/runner/character1.gif";
import char2 from "../../../assets/imagens/runner/character2.gif";
import char3 from "../../../assets/imagens/runner/character3.gif";
import char4 from "../../../assets/imagens/runner/character4.gif";
import char5 from "../../../assets/imagens/runner/character5.gif";
import logo from "../../../assets/imagens/runner/Logo_2.png";

// Palavra alvo
const targetWord = "SOL";

export default function Fase2({ onNext }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [letters, setLetters] = useState([]);
    const [collected, setCollected] = useState([]);
    const [position, setPosition] = useState("middle");
    const [showSelector, setShowSelector] = useState(true);
    const [finished, setFinished] = useState(false);

    const containerRef = useRef(null);

    // inicia fase
    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);
        setCollected([]);

        // gera letras a cada 2s
        const spawn = setInterval(() => {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            const randomLetter =
                alphabet[Math.floor(Math.random() * alphabet.length)];

            const lane = Math.random() < 0.33 ? "top" : Math.random() < 0.5 ? "middle" : "bottom";

            setLetters((prev) => [
                ...prev,
                { char: randomLetter, lane, id: Date.now() }
            ]);
        }, 2000);

        // termina em 40s
        setTimeout(() => {
            clearInterval(spawn);
            setRunning(false);
            setFinished(true);
        }, 40000);
    };

    // controle das setas
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

    // colisão com letras
    useEffect(() => {
        if (!running || letters.length === 0) return;

        const interval = setInterval(() => {
            letters.forEach((ltr) => {
                if (ltr.lane === position) {
                    if (
                        targetWord.includes(ltr.char) &&
                        !collected.includes(ltr.char)
                    ) {
                        setCollected((prev) => [...prev, ltr.char]);
                        setScore((prev) => prev + 10);
                    } else {
                        setScore((prev) => (prev > 0 ? prev - 5 : 0));
                    }
                    setLetters((prev) => prev.filter((l) => l.id !== ltr.id));
                }
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [letters, position, collected, running]);

    // escolher personagem
    const onCharacterChosen = (char) => {
        setCharacter(char);
        setShowSelector(false);
    };

    return (
        <div className="runner-main" onClick={handleStart} ref={containerRef}>
            {/* fundo fixo */}
            <div
                className="bg-layer fixed"
                style={{ backgroundImage: `url(${bg1})` }}
            />

            {/* Logo fixa no topo direito */}
                  <div className="logo-top">
                    <img src={logo} alt="Logo Balão" />
                  </div>

            {/* UI */}
            {!finished && (
                <>
                    <div className="ui-top">
                        {running && <div className="btn reward-btn">⭐ Pontos: {score}</div>}
                    </div>

                    {/* instrução */}
                    {running && (
                        <div className="current-word">
                            Forme a palavra: {targetWord}
                        </div>
                    )}

                    {/* personagem */}
                    {character && (
                        <div className={`character-wrap ${position}`}>
                            <img
                                src={character.src}
                                alt={character.name}
                                className={`character ${running ? "run" : "idle"}`}
                            />
                        </div>
                    )}

                    {/* letras que aparecem */}
                    {running &&
                        letters.map((ltr) => (
                            <div key={ltr.id} className={`letter ${ltr.lane}`}>
                                {ltr.char}
                            </div>
                        ))}

                    {!running && !showSelector && (
                        <div className="hint">Clique para começar a Fase 2</div>
                    )}

                    {/* modal seleção */}
                    {showSelector && (
                        <div className="char-modal" onClick={() => setShowSelector(false)}>
                            <div className="char-card" onClick={(e) => e.stopPropagation()}>
                                <h2>Escolha seu personagem</h2>
                                <div className="char-list">
                                    <button
                                        className="char-option"
                                        onClick={() =>
                                            onCharacterChosen({ name: "Lulix", src: char1 })
                                        }
                                    >
                                        <img src={char1} alt="Lulix" />
                                        <span>Lulix</span>
                                    </button>
                                    <button
                                        className="char-option"
                                        onClick={() =>
                                            onCharacterChosen({ name: "Rafiki", src: char2 })
                                        }
                                    >
                                        <img src={char2} alt="Rafiki" />
                                        <span>Rafiki</span>
                                    </button>
                                    <button
                                        className="char-option"
                                        onClick={() =>
                                            onCharacterChosen({ name: "Nikko", src: char3 })
                                        }
                                    >
                                        <img src={char3} alt="Nikko" />
                                        <span>Nikko</span>
                                    </button>
                                    <button
                                        className="char-option"
                                        onClick={() =>
                                            onCharacterChosen({ name: "Pippli", src: char4 })
                                        }
                                    >
                                        <img src={char4} alt="Pippli" />
                                        <span>Pippli</span>
                                    </button>
                                    <button
                                        className="char-option"
                                        onClick={() =>
                                            onCharacterChosen({ name: "Zuppy", src: char5 })
                                        }
                                    >
                                        <img src={char5} alt="Zuppy" />
                                        <span>Zuppy</span>
                                    </button>
                                </div>
                                <button className="close" onClick={() => setShowSelector(false)}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Feedback final */}
            {finished && (
                <div className="end-modal">
                    <div className="end-card">
                        {collected.length === targetWord.length ? (
                            <>
                                <h2>🎉 Parabéns!</h2>
                                <p>Você formou a palavra "{targetWord}" com {score} pontos!</p>
                            </>
                        ) : (
                            <>
                                <h2>⏳ Tempo Esgotado!</h2>
                                <p>
                                    Você conseguiu juntar {collected.length}/{targetWord.length} letras.
                                </p>
                            </>
                        )}
                        <button onClick={onNext}>Próxima Fase</button>
                    </div>
                </div>
            )}
        </div>
    );
}
