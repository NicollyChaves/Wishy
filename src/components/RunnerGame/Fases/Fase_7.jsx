// src/components/RunnerGame/Fase7.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_7.css";
import bg1 from "../../../assets/imagens/runner/Plano_fundo_7.jpg";
import char1 from "../../../assets/imagens/runner/character1.gif";
import char2 from "../../../assets/imagens/runner/character2.gif";
import char3 from "../../../assets/imagens/runner/character3.gif";
import char4 from "../../../assets/imagens/runner/character4.gif";
import char5 from "../../../assets/imagens/runner/character5.gif";
import logo from "../../../assets/imagens/runner/Logo_2.png";

// Obstáculos que o personagem enfrentará
const obstacles = [
    { img: "🌲", type: "tree" },
    { img: "🚧", type: "cone" },
    { img: "🐍", type: "snake" },
    { img: "🚗", type: "car" }
];

export default function Fase7({ onNext }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [position, setPosition] = useState("middle");
    const [obstaclesInGame, setObstaclesInGame] = useState([]);
    const [showSelector, setShowSelector] = useState(true);
    const [finished, setFinished] = useState(false);

    const containerRef = useRef(null);

    // Inicia a fase
    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);
        setObstaclesInGame([]);

        // Gera obstáculos a cada 3 segundos
        const spawn = setInterval(() => {
            const randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
            const newObstacle = { ...randomObstacle, xPos: 100 };
            setObstaclesInGame((prev) => [...prev, newObstacle]);
        }, 3000);

        // Termina em 40 segundos
        setTimeout(() => {
            clearInterval(spawn);
            setRunning(false);
            setFinished(true);
            onNext();
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

    // Mover obstáculos
    useEffect(() => {
        if (!running || obstaclesInGame.length === 0) return;

        const moveObstacles = setInterval(() => {
            setObstaclesInGame((prev) =>
                prev
                    .map((obstacle) => ({
                        ...obstacle,
                        xPos: obstacle.xPos - 5
                    }))
                    .filter((obstacle) => obstacle.xPos > -50)
            );
        }, 30);

        return () => clearInterval(moveObstacles);
    }, [running, obstaclesInGame]);

    // Colisão com obstáculos
    useEffect(() => {
        if (!running || obstaclesInGame.length === 0) return;

        const interval = setInterval(() => {
            obstaclesInGame.forEach((obstacle) => {
                if (obstacle.xPos < 40 && obstacle.xPos > 10 && obstacle.type === position) {
                    setScore((prev) => prev + 10);
                    setObstaclesInGame((prev) => prev.filter((ob) => ob !== obstacle));
                } else if (obstacle.xPos < 40 && obstacle.xPos > 10) {
                    setScore((prev) => (prev > 0 ? prev - 5 : 0));
                }
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [running, obstaclesInGame, position]);

    // Escolher personagem
    const onCharacterChosen = (char) => {
        setCharacter(char);
        setShowSelector(false);
    };

    return (
        <div className="runner-main" onClick={handleStart} ref={containerRef}>
            {/* Fundo fixo */}
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg1})` }} />

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

                    {/* Cartinha inicial (história) */}
                    {!running && !showSelector && (
                        <div className="story-card">
                            <h2>🏁 Grande Corrida Final!</h2>
                            <p>Você está na reta final! Apenas você pode vencer essa corrida. Prepare-se para desviar de obstáculos e conquistar a vitória!</p>
                            <button onClick={handleStart}>Iniciar Corrida</button>
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

                    {/* Obstáculos */}
                    {running &&
                        obstaclesInGame.map((obstacle, index) => (
                            <div
                                key={index}
                                className={`obstacle ${obstacle.type}`}
                                style={{ left: `${obstacle.xPos}%` }}
                            >
                                {obstacle.img}
                            </div>
                        ))}

                    {/* Modal de Seleção */}
                    {showSelector && (
                        <div className="char-modal" onClick={() => setShowSelector(false)}>
                            <div className="char-card" onClick={(e) => e.stopPropagation()}>
                                <h2>Escolha seu personagem</h2>
                                <div className="char-list">
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Luliz", src: char1 })}>
                                        <img src={char1} alt="Luliz" />
                                        <span>Luliz</span>
                                    </button>
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Rafiki", src: char2 })}>
                                        <img src={char2} alt="Rafiki" />
                                        <span>Rafiki</span>
                                    </button>
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Nikko", src: char3 })}>
                                        <img src={char3} alt="Nikko" />
                                        <span>Nikko</span>
                                    </button>
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Pippli", src: char4 })}>
                                        <img src={char4} alt="Pippli" />
                                        <span>Pippli</span>
                                    </button>
                                    <button className="char-option" onClick={() => onCharacterChosen({ name: "Zuppy", src: char5 })}>
                                        <img src={char5} alt="Zuppy" />
                                        <span>Zuppy</span>
                                    </button>
                                </div>
                                <button className="close" onClick={() => setShowSelector(false)}>Fechar</button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Feedback Final */}
            {finished && (
                <div className="end-modal">
                    <div className="end-card">
                        <h2>🎉 Parabéns!</h2>
                        <p>Você concluiu a corrida final com {score} pontos!</p>
                        <button onClick={() => window.location.reload()}>Próxima Fase</button>
                    </div>
                </div>
            )}
        </div>
    );
}
