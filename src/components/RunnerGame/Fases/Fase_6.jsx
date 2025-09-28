// src/components/RunnerGame/Fase6.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_6.css";
import bg6 from "../../../assets/imagens/runner/Fundo.png"; // fundo da fase
import char1 from "../../../assets/imagens/runner/character1.png";
import char2 from "../../../assets/imagens/runner/character2.png";
import char3 from "../../../assets/imagens/runner/character3.png";
import char4 from "../../../assets/imagens/runner/character4.png";
import char5 from "../../../assets/imagens/runner/character5.png";
import logo from "../../../assets/imagens/runner/Logo.png";

// Frases e palavras faltando
const phrases = [
    { sentence: "O ___ está no jardim.", missingWord: "gato" },
    { sentence: "Eu gosto de ___ no verão.", missingWord: "picolé" },
    { sentence: "O ___ canta muito alto.", missingWord: "pássaro" },
    { sentence: "A ___ está muito grande.", missingWord: "árvore" },
    { sentence: "O ___ está voando no céu.", missingWord: "avião" },
];

export default function Fase6({ onNext }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [currentPhrase, setCurrentPhrase] = useState(null);
    const [position, setPosition] = useState("middle");
    const [showSelector, setShowSelector] = useState(true);
    const [finished, setFinished] = useState(false);

    const containerRef = useRef(null);

    // Inicia a fase
    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);

        // Escolher uma frase a cada 6 segundos
        const spawn = setInterval(() => {
            const random = phrases[Math.floor(Math.random() * phrases.length)];
            setCurrentPhrase(random);
        }, 6000);

        // Limitar tempo da fase a 40 segundos
        setTimeout(() => {
            clearInterval(spawn);
            setRunning(false);
            onNext(); // Passa para a próxima fase
        }, 40000);
    };

    // Controle das setas
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

    // Escolher personagem
    const onCharacterChosen = (char) => {
        setCharacter(char);
        setShowSelector(false);
    };

    return (
        <div className="runner-main" onClick={handleStart} ref={containerRef}>
            {/* Fundo */}
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg6})` }} />

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

                    {/* Frase atual */}
                    {running && currentPhrase && (
                        <div className="current-phrase">
                            {currentPhrase.sentence.replace("___", "_____")}
                        </div>
                    )}

                    {/* Personagem */}
                    {character && (
                        <div className={`character-wrap ${position}`}>
                            <img
                                src={character.src}
                                alt={character.name}
                                className={`character ${running ? "run" : "idle"}`}
                            />
                        </div>
                    )}

                    {/* Modal de Seleção */}
                    {!running && !showSelector && (
                        <div className="hint">Clique para começar a Fase 6</div>
                    )}

                    {showSelector && (
                        <div className="char-modal" onClick={() => setShowSelector(false)}>
                            <div className="char-card" onClick={(e) => e.stopPropagation()}>
                                <h2>Escolha seu personagem</h2>
                                <div className="char-list">
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Gato", src: char1 })}>
                                        <img src={char1} alt="Gato" />
                                        <span>Gato</span>
                                    </button>
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Galo", src: char2 })}>
                                        <img src={char2} alt="Galo" />
                                        <span>Galo</span>
                                    </button>
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Cachorro", src: char3 })}>
                                        <img src={char3} alt="Cachorro" />
                                        <span>Cachorro</span>
                                    </button>
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Urso", src: char4 })}>
                                        <img src={char4} alt="Urso" />
                                        <span>Urso</span>
                                    </button>
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Pato", src: char5 })}>
                                        <img src={char5} alt="Pato" />
                                        <span>Pato</span>
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
                        <h2>🎉 Parabéns!</h2>
                        <p>Você concluiu a fase com {score} pontos!</p>
                        <button onClick={() => window.location.reload()}>Próxima Fase</button>
                    </div>
                </div>
            )}
        </div>
    );
}
