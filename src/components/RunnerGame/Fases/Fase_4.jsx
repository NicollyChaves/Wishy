// src/components/RunnerGame/Fases/Fase_4.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_4.css";

import bg4 from "../../../assets/imagens/runner/Plano_fundo_fase_1.jpg";
import logo from "../../../assets/imagens/runner/Logo_2.png";

import char1 from "../../../assets/imagens/runner/character1.gif";
import char2 from "../../../assets/imagens/runner/character2.gif";
import char3 from "../../../assets/imagens/runner/character3.gif";
import char4 from "../../../assets/imagens/runner/character4.gif";
import char5 from "../../../assets/imagens/runner/character5.gif";

import tree from "../../../assets/imagens/runner/Cogumelo.png";
import rock from "../../../assets/imagens/runner/Pedra.png";
import star from "../../../assets/imagens/runner/Estrela.png";
import heart from "../../../assets/imagens/runner/Coracao.png";

import Credito from "../../creditos/Creditos";
import BarraTempo from "../../BarraTempo/BarraTempo";
import CardPontuacao from "../../CardPontuacao/CardPontuacao";
import EscolherPersonagem from "../../EscolherPersonagem/EscolherPersonagem";
import Feedback from "../../Feedback/Feedback";
import Recompensa from "../../Recompensa/Recompensa";

// 👇 Cenas do cotidiano
const cenas = [
    {
        emoji: "🏫",
        frase: "Ir para a escola",
        correta: "Escola",
        opcoes: ["Escola", "Cama", "Bola", "Chuva"],
    },
    {
        emoji: "🍽",
        frase: "Hora do almoço",
        correta: "Almoço",
        opcoes: ["Almoço", "Mochila", "Sol", "Mesa"],
    },
    {
        emoji: "🌧",
        frase: "Dia de chuva",
        correta: "Guarda-chuva",
        opcoes: ["Mesa", "Guarda-chuva", "Sapato", "Peixe"],
    },
    {
        emoji: "🛏",
        frase: "Hora de dormir",
        correta: "Cama",
        opcoes: ["Flor", "Cama", "Escola", "Copo"],
    },
    {
        emoji: "🚴‍♀️",
        frase: "Brincar com os amigos",
        correta: "Bicicleta",
        opcoes: ["Cadeira", "Pão", "Bicicleta", "Janela"],
    },
];

const obstacles = [
    { type: "tree", img: tree },
    { type: "rock", img: rock },
];

const bonuses = [
    { type: "star", img: star, points: 15 },
    { type: "heart", img: heart, points: 20 },
];

export default function Fase4({ onNext, idJogador }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [entities, setEntities] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showSelector, setShowSelector] = useState(true);
    const [timeLeft, setTimeLeft] = useState(5);
    const [cenaAtual, setCenaAtual] = useState(cenas[0]);
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const spawnRef = useRef(null);
    const timerRef = useRef(null);

    const personagens = [
        { name: "Lulix", src: char1 },
        { name: "Rafiki", src: char2 },
        { name: "Nikko", src: char3 },
        { name: "Pippli", src: char4 },
        { name: "Zuppy", src: char5 },
    ];

    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);
        setEntities([]);
        setTimeLeft(90);
        setFinished(false);
        setShowRecompensa(false);
        setShowFeedback(false);
        setCenaAtual(cenas[Math.floor(Math.random() * cenas.length)]);

        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                // palavras (as opções da cena atual)
                const palavra =
                    cenaAtual.opcoes[
                    Math.floor(Math.random() * cenaAtual.opcoes.length)
                    ];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "word", text: palavra, x: 1000, y: 0 },
                ]);
            } else if (rand < 0.75) {
                const obs = obstacles[Math.floor(Math.random() * obstacles.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: obs.type, img: obs.img, x: 1000, y: 0 },
                ]);
            } else {
                const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: bonus.type, img: bonus.img, points: bonus.points, x: 1000, y: 0 },
                ]);
            }
        }, 2500);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    clearInterval(spawnRef.current);
                    setRunning(false);
                    setFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        if (!running) return;
        const loop = setInterval(() => {
            setEntities((prev) =>
                prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -150)
            );
        }, 30);
        return () => clearInterval(loop);
    }, [running]);

    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const collided = e.x < 250 && e.x > 150 && positionY < 80;
                    if (collided) {
                        if (e.type === "word") {
                            if (e.text === cenaAtual.correta) {
                                setScore((s) => s + 15);
                                setCenaAtual(cenas[Math.floor(Math.random() * cenas.length)]);
                            } else {
                                setScore((s) => Math.max(0, s - 5));
                            }
                        } else if (e.type === "star" || e.type === "heart") {
                            setScore((s) => s + (e.points || 10));
                        } else {
                            setScore((s) => Math.max(0, s - 10));
                        }
                    } else {
                        next.push(e);
                    }
                });
                return next;
            });
        }, 100);
        return () => clearInterval(check);
    }, [running, positionY, cenaAtual]);

    const handleJump = () => {
        if (!running || isJumping) return;
        setIsJumping(true);
        setPositionY(150);
        setTimeout(() => setPositionY(0), 500);
        setTimeout(() => setIsJumping(false), 800);
    };

    useEffect(() => {
        const key = (e) => e.key === "ArrowUp" && handleJump();
        window.addEventListener("keydown", key);
        window.addEventListener("touchstart", handleJump);
        return () => {
            window.removeEventListener("keydown", key);
            window.removeEventListener("touchstart", handleJump);
        };
    });

    useEffect(() => {
        if (finished) {
            setShowRecompensa(true);
            const t = setTimeout(() => {
                setShowRecompensa(false);
                setShowFeedback(true);
            }, 4000);
            return () => clearTimeout(t);
        }
    }, [finished]);

    const handleCharacterChoose = (char) => {
        setCharacter(char);
        setShowSelector(false);
    };

    return (
        <div className="runner-main" onClick={handleStart}>
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg4})` }} />
            <div className="logo-top"><img src={logo} alt="Logo" /></div>

            {!finished && (
                <>
                    {running && (
                        <>
                            <div className="cena-display">
                                <span className="emoji">{cenaAtual.emoji}</span> {cenaAtual.frase}
                            </div>
                            <CardPontuacao score={score} />
                            <BarraTempo timeLeft={timeLeft} />
                        </>
                    )}

                    {character && (
                        <div
                            className={`character-wrap ${isJumping ? "jumping" : ""}`}
                            style={{ left: `200px`, bottom: `${20 + positionY}px` }}
                        >
                            <img src={character.src} alt={character.name} className="character" />
                        </div>
                    )}

                    {running &&
                        entities.map((e) => (
                            <div key={e.id} className={`entity ${e.type}`} style={{ left: `${e.x}px`, bottom: `${20 + e.y}px` }}>
                                {e.type === "word" ? <span className="word-text">{e.text}</span> : <img src={e.img} alt={e.type} />}
                            </div>
                        ))}

                    {!running && !showSelector && <div className="hint">Clique para começar a Fase 4</div>}

                    {showSelector && (
                        <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} />
                    )}
                </>
            )}

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && <Feedback pontuacao={score} onNext={onNext} idJogador={idJogador} fase="fase_4" />}

            <Credito />
        </div>
    );
}
