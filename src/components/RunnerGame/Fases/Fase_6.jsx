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
import Ranking from "../../Ranking/Ranking";

// 🧠 Frases com opções de resposta e áudio
const frases = [
    {
        texto: "O gato correu para ___",
        correta: "🏠",
        opcoes: ["🏠", "🌳", "🪣"],
        audio: "/audios/frases/fase6_gato.mp3",
    },
    {
        texto: "A foca nada no ___",
        correta: "🌊",
        opcoes: ["🌊", "🏜️", "☁️"],
        audio: "/audios/frases/fase6_foca.mp3",
    },
    {
        texto: "O galo canta no ___",
        correta: "🌅",
        opcoes: ["🌅", "🌙", "🏞️"],
        audio: "/audios/frases/fase6_galo.mp3",
    },
    {
        texto: "A borboleta voa na ___",
        correta: "🌼",
        opcoes: ["🌼", "🍎", "🪵"],
        audio: "/audios/frases/fase6_borboleta.mp3",
    },
    {
        texto: "O menino comeu uma ___",
        correta: "🍎",
        opcoes: ["🍎", "🪨", "🌲"],
        audio: "/audios/frases/fase6_menino.mp3",
    },
];

const obstacles = [
    { type: "rock", img: rock },
    { type: "mushroom", img: mushroom },
];

const bonuses = [
    { type: "star", img: star, points: 15 },
    { type: "heart", img: heart, points: 20 },
];

export default function Fase6({ onNext, idJogador }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [positionY, setPositionY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [entities, setEntities] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showSelector, setShowSelector] = useState(true);
    const [currentFrase, setCurrentFrase] = useState(frases[0]);
    const [completed, setCompleted] = useState(false);
    const [highlighted, setHighlighted] = useState(false);

    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [floatingScores, setFloatingScores] = useState([]);
    const [flashColor, setFlashColor] = useState("");

    const spawnRef = useRef(null);
    const timerRef = useRef(null);
    const fraseTimerRef = useRef(null);

    const charPosX = 100;

    const personagens = [
        { name: "Lulix", src: char1 },
        { name: "Rafiki", src: char2 },
        { name: "Nikko", src: char3 },
        { name: "Pippli", src: char4 },
        { name: "Zuppy", src: char5 },
    ];

    // 🔄 Função para trocar a frase
    const trocarFrase = () => {
        const novaFrase = frases[Math.floor(Math.random() * frases.length)];
        setCurrentFrase(novaFrase);
        setCompleted(false);
        setHighlighted(false);
    };

    // 🟢 Iniciar fase
    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);
        setTimeLeft(90);
        setEntities([]);
        setFinished(false);
        setCompleted(false);
        setHighlighted(false);
        trocarFrase();

        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                const opcao =
                    currentFrase.opcoes[Math.floor(Math.random() * currentFrase.opcoes.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "emoji", emoji: opcao, x: 1000, y: 0 },
                ]);
            } else if (rand < 0.8) {
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
        }, 2200);

        // ⏳ Timer geral
        timerRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(timerRef.current);
                    clearInterval(spawnRef.current);
                    clearInterval(fraseTimerRef.current);
                    setRunning(false);
                    setFinished(true);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        // 🔁 Mudar a frase automaticamente a cada 10s
        fraseTimerRef.current = setInterval(() => {
            trocarFrase();
        }, 10000);
    };

    // 🎮 Movimento das entidades
    useEffect(() => {
        if (!running) return;
        const move = setInterval(() => {
            setEntities((prev) =>
                prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -120)
            );
        }, 30);
        return () => clearInterval(move);
    }, [running]);

    // 🎯 Colisões e pontuação
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            if (isJumping) return;

            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const charWidth = 120;
                    const charHeight = 120;
                    const entW = e.type === "emoji" ? 60 : 80;
                    const entH = e.type === "emoji" ? 60 : 80;
                    const collided =
                        e.x < charPosX + charWidth &&
                        e.x + entW > charPosX &&
                        e.y < positionY + charHeight &&
                        e.y + entH > positionY;

                    if (collided && !e.hit) {
                        e.hit = true;

                        if (e.type === "emoji") {
                            if (e.emoji === currentFrase.correta) {
                                setHighlighted(true);
                                setCompleted(true);
                                setScore((s) => s + 15);
                                addFloatingScore("+15", "green");
                                setFlashColor("green");

                                // 🟡 Trocar frase ao acertar
                                setTimeout(() => trocarFrase(), 800);
                            } else {
                                setScore((s) => Math.max(0, s - 5));
                                addFloatingScore("-5", "red");
                                setFlashColor("red");
                            }
                        } else if (e.type === "star" || e.type === "heart") {
                            setScore((s) => s + (e.points || 10));
                            addFloatingScore(`+${e.points}`, "yellow");
                            setFlashColor("green");
                        } else {
                            setScore((s) => Math.max(0, s - 10));
                            addFloatingScore("-10", "red");
                            setFlashColor("red");
                        }

                        setTimeout(() => setFlashColor(""), 300);
                    } else if (!collided) {
                        next.push(e);
                    }
                });
                return next;
            });
        }, 100);
        return () => clearInterval(check);
    }, [running, positionY, currentFrase, isJumping]);

    const addFloatingScore = (text, color) => {
        const id = `${Date.now()}-${Math.random()}`;
        setFloatingScores((prev) => [...prev, { id, text, color }]);
        setTimeout(() => {
            setFloatingScores((prev) => prev.filter((f) => f.id !== id));
        }, 1000);
    };

    // 🪂 Pulo
    const handleJump = () => {
        if (!running || isJumping) return;
        setIsJumping(true);
        setPositionY(220);
        setTimeout(() => setPositionY(0), 700);
        setTimeout(() => setIsJumping(false), 900);
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

    // 🎁 Fim da fase
    useEffect(() => {
        if (finished) {
            clearInterval(fraseTimerRef.current);
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
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg})` }} />

            {flashColor && <div className={`flash-overlay ${flashColor}`} />}

            {floatingScores.map((f) => (
                <div key={f.id} className={`floating-score ${f.color}`}>
                    {f.text}
                </div>
            ))}

            <div className="logo-top"><img src={logo} alt="Logo" /></div>

            {!finished && (
                <>
                    {running && (
                        <>
                            <div className={`frase-display ${highlighted ? "highlighted" : ""}`}>
                                {completed
                                    ? currentFrase.texto.replace("___", currentFrase.correta)
                                    : currentFrase.texto}
                            </div>
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
                            <div
                                key={e.id}
                                className={`entity ${e.type}`}
                                style={{ left: `${e.x}px`, bottom: `${20 + e.y}px` }}
                            >
                                {e.type === "emoji" ? (
                                    <span className="emoji-word">{e.emoji}</span>
                                ) : (
                                    <img src={e.img} alt={e.type} />
                                )}
                            </div>
                        ))}

                    {!running && !showSelector && <div className="hint">Clique para começar a Fase 6 🎮</div>}

                    {showSelector && (
                        <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} />
                    )}
                </>
            )}

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && <Feedback pontuacao={score} onNext={onNext} idJogador={idJogador} fase="fase_6" />}

            <Ranking />
            <Credito />
        </div>
    );
}
