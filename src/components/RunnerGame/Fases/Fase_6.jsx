// src/components/RunnerGame/Fases/Fase_6.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_6.css";

import bg from "../../../assets/imagens/runner/Plano_fundo_fase_1.jpg";
import logo from "../../../assets/imagens/runner/Logo_2.png";

import char1 from "../../../assets/imagens/runner/character1.gif";
import char2 from "../../../assets/imagens/runner/character2.gif";
import char3 from "../../../assets/imagens/runner/character3.gif";
import char4 from "../../../assets/imagens/runner/character4.gif";
import char5 from "../../../assets/imagens/runner/character5.gif";

import star from "../../../assets/imagens/runner/Estrela.png";
import heart from "../../../assets/imagens/runner/Coracao.png";
import rock from "../../../assets/imagens/runner/Pedra.png";
import mushroom from "../../../assets/imagens/runner/Cogumelo.png";

import BarraTempo from "../../BarraTempo/BarraTempo";
import CardPontuacao from "../../CardPontuacao/CardPontuacao";
import EscolherPersonagem from "../../EscolherPersonagem/EscolherPersonagem";
import Recompensa from "../../Recompensa/Recompensa";
import Feedback from "../../Feedback/Feedback";
import Credito from "../../creditos/Creditos";

// Frases com opções de resposta
const frases = [
    { texto: "O gato correu para a ___", correta: "🏠", opcoes: ["🏠", "🌳", "🪣"] },
    { texto: "A foca nada no ___", correta: "🌊", opcoes: ["🌊", "🏜️", "☁️"] },
    { texto: "O galo canta no ___", correta: "🌅", opcoes: ["🌅", "🌙", "🏞️"] },
    { texto: "A borboleta voa no ___", correta: "🌼", opcoes: ["🌼", "🍎", "🪵"] },
    { texto: "O menino comeu uma ___", correta: "🍎", opcoes: ["🍎", "🪨", "🌲"] },
];

export default function Fase6({ onNext, idJogador }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [entities, setEntities] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showSelector, setShowSelector] = useState(true);
    const [currentFrase, setCurrentFrase] = useState(frases[0]);
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const spawnRef = useRef(null);
    const timerRef = useRef(null);
    const fraseTimerRef = useRef(null);
    const [charPosX, setCharPosX] = useState(100);
    const [positionY, setPositionY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);

    const personagens = [
        { name: "Lulix", src: char1 },
        { name: "Rafiki", src: char2 },
        { name: "Nikko", src: char3 },
        { name: "Pippli", src: char4 },
        { name: "Zuppy", src: char5 },
    ];

    // Inicia a fase
    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);
        setTimeLeft(60);
        setEntities([]);
        setFinished(false);
        setCurrentFrase(frases[Math.floor(Math.random() * frases.length)]);

        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                // Emojis de palavras
                const random = currentFrase.opcoes[Math.floor(Math.random() * currentFrase.opcoes.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "word", emoji: random, x: 1000, y: 0 },
                ]);
            } else if (rand < 0.7) {
                // Obstáculos
                const obs = rand < 0.6 ? rock : mushroom;
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "obstacle", img: obs, x: 1000, y: 0 },
                ]);
            } else {
                // Bônus
                const bonus = rand < 0.85 ? star : heart;
                const points = bonus === star ? 15 : 20;
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "bonus", img: bonus, points, x: 1000, y: 0 },
                ]);
            }
        }, 2500);

        timerRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(timerRef.current);
                    clearInterval(spawnRef.current);
                    clearInterval(fraseTimerRef.current);
                    setFinished(true);
                    setRunning(false);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        fraseTimerRef.current = setInterval(() => {
            setCurrentFrase(frases[Math.floor(Math.random() * frases.length)]);
        }, 20000);
    };

    // Movimento dos elementos
    useEffect(() => {
        if (!running) return;
        const move = setInterval(() => {
            setEntities((prev) => prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -100));
        }, 40);
        return () => clearInterval(move);
    }, [running]);

    // Colisões
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const collided = e.x < 200 && e.x > 80 && positionY < 50;
                    if (collided) {
                        if (e.type === "word") {
                            if (e.emoji === currentFrase.correta) {
                                setScore((s) => s + 15);
                            } else {
                                setScore((s) => Math.max(0, s - 10));
                            }
                        } else if (e.type === "bonus") {
                            setScore((s) => s + e.points);
                        } else {
                            setScore((s) => Math.max(0, s - 10));
                        }
                    } else {
                        next.push(e);
                    }
                });
                return next;
            });
        }, 150);
        return () => clearInterval(check);
    }, [running, positionY, currentFrase]);

    // Pulo
    const handleJump = () => {
        if (!running || isJumping) return;
        setIsJumping(true);
        setPositionY(120);
        setTimeout(() => setPositionY(0), 500);
        setTimeout(() => setIsJumping(false), 700);
    };

    useEffect(() => {
        const key = (e) => e.key === "ArrowUp" && handleJump();
        window.addEventListener("keydown", key);
        window.addEventListener("touchstart", handleJump);
        return () => {
            window.removeEventListener("keydown", key);
            window.removeEventListener("touchstart", handleJump);
        };
    }, [isJumping, running]);

    // Exibe recompensa e feedback
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
        <div className="fase6-container" onClick={handleStart}>
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg})` }} />
            <div className="logo-top"><img src={logo} alt="Logo" /></div>

            {!finished && (
                <>
                    {running && (
                        <>
                            <div className="frase-display">{currentFrase.texto}</div>
                            <CardPontuacao score={score} />
                            <BarraTempo timeLeft={timeLeft} />
                        </>
                    )}

                    {character && (
                        <div
                            className={`character-wrap ${isJumping ? "jumping" : ""}`}
                            style={{ left: `${charPosX}px`, bottom: `${20 + positionY}px` }}
                        >
                            <img src={character.src} alt={character.name} className="character" />
                        </div>
                    )}

                    {running &&
                        entities.map((e) => (
                            <div key={e.id} className={`entity ${e.type}`} style={{ left: `${e.x}px`, bottom: `20px` }}>
                                {e.type === "word" ? (
                                    <span className="emoji-word">{e.emoji}</span>
                                ) : (
                                    <img src={e.img} alt={e.type} />
                                )}
                            </div>
                        ))}

                    {!running && !showSelector && <div className="hint">Clique para começar a Fase 6</div>}

                    {showSelector && (
                        <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} onClose={() => setShowSelector(false)} />
                    )}
                </>
            )}

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && <Feedback pontuacao={score} onNext={onNext} idJogador={idJogador} fase="fase_6" />}
            <Credito />
        </div>
    );
}
