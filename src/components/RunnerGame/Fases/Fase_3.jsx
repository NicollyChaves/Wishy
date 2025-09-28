// src/components/RunnerGame/Fase3.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_3.css";

import bg1 from "../../../assets/imagens/runner/Fundo.png";
import char1 from "../../../assets/imagens/runner/character1.png";
import char2 from "../../../assets/imagens/runner/character2.png";
import char3 from "../../../assets/imagens/runner/character3.png";
import char4 from "../../../assets/imagens/runner/character4.png";
import char5 from "../../../assets/imagens/runner/character5.png";
import logo from "../../../assets/imagens/runner/Logo.png";

const letterSounds = [
    { sound: "Bê", correct: "B" },
    { sound: "Dê", correct: "D" },
    { sound: "Mê", correct: "M" },
    { sound: "Fê", correct: "F" },
    { sound: "Pê", correct: "P" },
    { sound: "Tê", correct: "T" },
    { sound: "Lê", correct: "L" },
];

export default function Fase3({ onNext }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [currentSound, setCurrentSound] = useState(null);
    const [letters, setLetters] = useState([]);
    const [position, setPosition] = useState("middle");
    const [showSelector, setShowSelector] = useState(true);
    const [finished, setFinished] = useState(false);

    const containerRef = useRef(null);

    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);

        const spawn = setInterval(() => {
            const random = letterSounds[Math.floor(Math.random() * letterSounds.length)];
            setCurrentSound(random);

            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            const randomLetters = alphabet
                .filter((l) => l !== random.correct)
                .sort(() => 0.5 - Math.random())
                .slice(0, 2);

            const allLetters = [...randomLetters, random.correct].sort(() => 0.5 - Math.random());

            setLetters(
                allLetters.map((ltr, i) => ({
                    char: ltr,
                    lane: i === 0 ? "top" : i === 1 ? "middle" : "bottom",
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
        if (!running || letters.length === 0 || !currentSound) return;

        const interval = setInterval(() => {
            letters.forEach((ltr) => {
                if (ltr.lane === position) {
                    if (ltr.char === currentSound.correct) {
                        setScore((prev) => prev + 10);
                    } else {
                        setScore((prev) => (prev > 0 ? prev - 5 : 0));
                    }
                    setLetters([]);
                }
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [letters, position, currentSound, running]);

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

                    {running && currentSound && (
                        <div className="current-word">
                            Som de: <strong>{currentSound.sound}</strong>
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
                        letters.map((ltr, i) => (
                            <div key={i} className={`letter ${ltr.lane}`}>
                                {ltr.char}
                            </div>
                        ))}

                    {!running && !showSelector && (
                        <div className="hint">Clique para começar a Fase 3</div>
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
