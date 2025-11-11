// src/components/RunnerGame/Fase_7.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_7.css";

import bg1 from "../../../assets/imagens/runner/Plano_fundo_fase_1.jpg";
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
import Manual_Fase_7 from "../Manuais/Manual_Fase_7";
import Ranking from "../../Ranking/Ranking";
import Duvida from "../../Duvida/Duvida";

export default function Fase7({ onNext, idJogador }) {
    const [showManual, setShowManual] = useState(true);
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [entities, setEntities] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [flashColor, setFlashColor] = useState("");
    const [floatingScores, setFloatingScores] = useState([]);
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [memoryEmojis, setMemoryEmojis] = useState([]);
    const [visibleEmojis, setVisibleEmojis] = useState(true);
    const [collectedEmojis, setCollectedEmojis] = useState([]);

    const spawnRef = useRef(null);
    const timerRef = useRef(null);
    const charPosX = 100;

    const personagens = [
        { name: "Lulix", src: char1 },
        { name: "Rafiki", src: char2 },
        { name: "Nikko", src: char3 },
        { name: "Pippli", src: char4 },
        { name: "Zuppy", src: char5 },
    ];

    // 🎲 Emojis e bônus
    const allEmojis = ["🍎", "⭐", "🌈", "🍌", "⚽", "💎", "🍉", "🦋", "🐱", "☁️"];
    const obstacles = [
        { type: "tree", img: tree },
        { type: "rock", img: rock },
    ];
    const bonuses = [
        { type: "star", img: star, points: 15 },
        { type: "heart", img: heart, points: 20 },
    ];

    // 🔁 Escolhe 3 emojis aleatórios
    const chooseNewEmojis = () => {
        const chosen = [...allEmojis.sort(() => 0.5 - Math.random()).slice(0, 3)];
        setMemoryEmojis(chosen);
        setVisibleEmojis(true);
        setCollectedEmojis([]);
        setTimeout(() => setVisibleEmojis(false), 5000);
    };

    const handleStart = () => {
        if (running || !character) return;
        chooseNewEmojis();
        setScore(0);
        setEntities([]);
        setFinished(false);
        setShowRecompensa(false);
        setShowFeedback(false);
        setFlashColor("");

        setTimeout(() => {
            setRunning(true);
            startGameLoop();
        }, 5000);
    };

    const startGameLoop = () => {
        setTimeLeft(90);
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

        // 🌀 Spawn dos elementos
        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.4) {
                const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now(), type: "emoji", text: randomEmoji, x: 1000, y: 0 },
                ]);
            } else if (rand < 0.7) {
                const obs = obstacles[Math.floor(Math.random() * obstacles.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now(), type: obs.type, img: obs.img, x: 1000, y: 0 },
                ]);
            } else {
                const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now(), type: bonus.type, img: bonus.img, points: bonus.points, x: 1000, y: 0 },
                ]);
            }
        }, 2000);
    };

    // Movimento
    useEffect(() => {
        if (!running) return;
        const loop = setInterval(() => {
            setEntities((prev) =>
                prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -120)
            );
        }, 30);
        return () => clearInterval(loop);
    }, [running]);

    // Colisões
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            if (isJumping) return;
            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const charW = 120;
                    const charH = 120;
                    const entW = 80;
                    const entH = 80;

                    const collided =
                        e.x < charPosX + charW &&
                        e.x + entW > charPosX &&
                        e.y < positionY + charH &&
                        e.y + entH > positionY;

                    if (collided && !e.hit) {
                        e.hit = true;
                        if (e.type === "emoji") {
                            if (memoryEmojis.includes(e.text)) {
                                if (!collectedEmojis.includes(e.text)) {
                                    const newCollected = [...collectedEmojis, e.text];
                                    setCollectedEmojis(newCollected);
                                    setScore((s) => s + 15);
                                    setFlashColor("green");
                                    addFloatingScore("+15", "green");
                                    if (newCollected.length === 3) {
                                        setTimeout(() => chooseNewEmojis(), 800);
                                    }
                                }
                            } else {
                                setScore((s) => Math.max(0, s - 10));
                                setFlashColor("red");
                                addFloatingScore("-10", "red");
                            }
                        } else if (e.type === "star" || e.type === "heart") {
                            setScore((s) => s + (e.points || 10));
                            addFloatingScore(`+${e.points}`, "yellow");
                            setFlashColor("green");
                        } else {
                            setScore((s) => Math.max(0, s - 5));
                            setFlashColor("red");
                            addFloatingScore("-5", "red");
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
    }, [running, isJumping, positionY, memoryEmojis, collectedEmojis]);

    const addFloatingScore = (text, color) => {
        const id = `${Date.now()}-${Math.random()}`;
        setFloatingScores((prev) => [...prev, { id, text, color }]);
        setTimeout(() => {
            setFloatingScores((prev) => prev.filter((f) => f.id !== id));
        }, 1000);
    };

    const handleJump = () => {
        if (!running || isJumping) return;
        setIsJumping(true);
        setPositionY(200);
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
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg1})` }} />
            {flashColor && <div className={`flash-overlay ${flashColor}`} />}

            {showManual && <Manual_Fase_7 onStart={() => { setShowManual(false); setShowSelector(true); }} />}

            {floatingScores.map((f) => (
                <div key={f.id} className={`floating-score ${f.color}`}>
                    {f.text}
                </div>
            ))}

            {!showManual && (
                <>
                    <div className="logo-top"><img src={logo} alt="Logo" /></div>

                    {visibleEmojis && (
                        <div className="emoji-display">
                            {memoryEmojis.map((e, i) => <span key={i}>{e}</span>)}
                        </div>
                    )}

                    {!visibleEmojis && collectedEmojis.length > 0 && (
                        <div className="emoji-display recollect">
                            {collectedEmojis.map((e, i) => <span key={i}>{e}</span>)}
                        </div>
                    )}

                    {!finished && (
                        <>
                            {running && (
                                <>
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

                            {running && entities.map((e) => (
                                <div
                                    key={e.id}
                                    className={`entity ${e.type}`}
                                    style={{ left: `${e.x}px`, bottom: `${20 + e.y}px` }}
                                >
                                    {e.type === "emoji" ? (
                                        <span className="word-text">{e.text}</span>
                                    ) : (
                                        <img src={e.img} alt={e.type} />
                                    )}
                                </div>
                            ))}

                            {!running && !showSelector && (
                                <div className="hint">Clique para começar a Corrida da Memória 🧠✨</div>
                            )}

                            {showSelector && (
                                <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} />
                            )}
                        </>
                    )}

                    <Duvida>
                        <Manual_Fase_7 />
                    </Duvida>

                    {showRecompensa && <Recompensa pontuacao={score} />}
                    {showFeedback && (
                        <Feedback
                            pontuacao={score}
                            onNext={() => onNext && onNext()}
                            idJogador={idJogador}
                            fase="fase_7"
                        />
                    )}

                    <Ranking />
                    <Credito />
                </>
            )}
        </div>
    );
}
