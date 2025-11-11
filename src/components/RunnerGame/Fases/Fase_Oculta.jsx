import React, { useState, useEffect, useRef } from "react";
import "./Fase_Oculta.css";

import bgForest from "../../../assets/imagens/runner/Plano_fundo_fase_1.jpg";
import char1 from "../../../assets/imagens/runner/character1.gif";
import char2 from "../../../assets/imagens/runner/character2.gif";
import char3 from "../../../assets/imagens/runner/character3.gif";
import char4 from "../../../assets/imagens/runner/character4.gif";
import char5 from "../../../assets/imagens/runner/character5.gif";
import logo from "../../../assets/imagens/runner/Logo_2.png";

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
import Manual_Fase_Oculta from "../Manuais/Manual_Fase_Oculta";
import Ranking from "../../Ranking/Ranking";

const creatures = [
    { img: "🧚‍♀️", name: "Fada" },
    { img: "🦄", name: "Unicórnio" },
    { img: "🐿️", name: "Esquilo" },
    { img: "🦋", name: "Borboleta" },
    { img: "🍄", name: "Cogumelo" },
];

const obstacles = [
    { type: "tree", img: tree },
    { type: "rock", img: rock },
];

const bonuses = [
    { type: "star", img: star, points: 20 },
    { type: "heart", img: heart, points: 25 },
];

export default function FaseOculta({ onNext, idJogador }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [entities, setEntities] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showSelector, setShowSelector] = useState(true);
    const [timeLeft, setTimeLeft] = useState(30);
    const [currentCreature, setCurrentCreature] = useState(creatures[0]);
    const [charPosX] = useState(100);
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [flashColor, setFlashColor] = useState("");
    const [floatingScores, setFloatingScores] = useState([]);
    const [showManual, setShowManual] = useState(true);

    const spawnRef = useRef(null);
    const timerRef = useRef(null);
    const emojiTimerRef = useRef(null);

    const personagens = [
        { name: "Lulix", src: char1 },
        { name: "Rafiki", src: char2 },
        { name: "Nikko", src: char3 },
        { name: "Pippli", src: char4 },
        { name: "Zuppy", src: char5 },
    ];

    // 🚀 Inicia fase
    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);
        setEntities([]);
        setTimeLeft(90);
        setFinished(false);
        setShowRecompensa(false);
        setShowFeedback(false);
        setCurrentCreature(creatures[Math.floor(Math.random() * creatures.length)]);

        // Gera entidades
        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                const random = creatures[Math.floor(Math.random() * creatures.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "creature", char: random.img, x: 1000, y: 0 },
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
        }, 2000);

        // Contagem regressiva
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    clearInterval(spawnRef.current);
                    clearInterval(emojiTimerRef.current);
                    setRunning(false);
                    setFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // 🧚 Alterna criatura a cada 15s
    useEffect(() => {
        if (running) {
            emojiTimerRef.current = setInterval(() => {
                setCurrentCreature(creatures[Math.floor(Math.random() * creatures.length)]);
            }, 15000);
        }
        return () => clearInterval(emojiTimerRef.current);
    }, [running]);

    // 🎮 Movimento dos obstáculos
    useEffect(() => {
        if (!running) return;
        const loop = setInterval(() => {
            setEntities((prev) => prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -120));
        }, 30);
        return () => clearInterval(loop);
    }, [running]);

    // ⚡ Colisões + Flash + Score flutuante
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            if (isJumping) return;

            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const charWidth = 120;
                    const charHeight = 120;
                    const entW = 70;
                    const entH = 70;
                    const collided =
                        e.x < charPosX + charWidth &&
                        e.x + entW > charPosX &&
                        e.y < positionY + charHeight &&
                        e.y + entH > positionY;

                    if (collided && !e.hit) {
                        e.hit = true;

                        if (e.type === "creature") {
                            // ✅ Acertou o mesmo emoji do topo
                            if (e.char === currentCreature.img) {
                                setScore((s) => s + 20);
                                setFlashColor("green");
                                addFloatingScore("+20", "green");

                                // troca o emoji do topo ao acertar
                                setCurrentCreature(creatures[Math.floor(Math.random() * creatures.length)]);
                            } else {
                                // ❌ Pegou emoji errado
                                setScore((s) => Math.max(0, s - 10));
                                setFlashColor("red");
                                addFloatingScore("-10", "red");
                            }
                        } else if (e.type === "star" || e.type === "heart") {
                            setScore((s) => s + (e.points || 10));
                            setFlashColor("yellow");
                            addFloatingScore(`+${e.points}`, "yellow");
                        } else {
                            setScore((s) => Math.max(0, s - 10));
                            setFlashColor("red");
                            addFloatingScore("-10", "red");
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
    }, [running, positionY, charPosX, isJumping, currentCreature]);

    // ✨ Pontuação flutuante
    const addFloatingScore = (text, color) => {
        const id = `${Date.now()}-${Math.random()}`;
        setFloatingScores((prev) => [...prev, { id, text, color }]);
        setTimeout(() => setFloatingScores((prev) => prev.filter((f) => f.id !== id)), 1000);
    };

    // 🕹️ Pulo
    const handleJump = () => {
        if (!running || isJumping) return;
        setIsJumping(true);
        setPositionY(200);
        setTimeout(() => setPositionY(0), 700);
        setTimeout(() => setIsJumping(false), 900);
    };

    // ⌨️ Controles
    useEffect(() => {
        const key = (e) => e.key === "ArrowUp" && handleJump();
        window.addEventListener("keydown", key);
        window.addEventListener("touchstart", handleJump);
        return () => {
            window.removeEventListener("keydown", key);
            window.removeEventListener("touchstart", handleJump);
        };
    });

    // 💾 Salvamento pontuação
    useEffect(() => {
        if (finished && idJogador) {
            const saveScore = async () => {
                try {
                    await fetch("http://localhost:5000/api/jogadores/pontuacao", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id_jogador: idJogador,
                            fase: "fase_oculta",
                            pontuacao: score,
                        }),
                    });
                } catch (error) {
                    console.error("Erro ao salvar pontuação:", error);
                }
            };
            saveScore();

            setShowRecompensa(true);
            const t = setTimeout(() => {
                setShowRecompensa(false);
                setShowFeedback(true);
            }, 4000);
            return () => clearTimeout(t);
        }
    }, [finished, idJogador, score]);

    const handleCharacterChoose = (char) => {
        setCharacter(char);
        setShowSelector(false);
    };

    return (
        <div className="runner-main" onClick={handleStart}>
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bgForest})` }} />

            {flashColor && <div className={`flash-overlay ${flashColor}`} />}

            {floatingScores.map((f) => (
                <div key={f.id} className={`floating-score ${f.color}`}>
                    {f.text}
                </div>
            ))}

            <div className="logo-top">
                <img src={logo} alt="Logo" />
            </div>

            {!finished && (
                <>
                    {running && (
                        <>
                            <div className="emoji-display">{currentCreature.img}</div>
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
                            <div key={e.id} className={`entity ${e.type}`} style={{ left: `${e.x}px`, bottom: `${20 + e.y}px` }}>
                                {e.type === "creature" ? (
                                    <span className="letter-char">{e.char}</span>
                                ) : (
                                    <img src={e.img} alt={e.type} />
                                )}
                            </div>
                        ))}

                    {!running && !showSelector && <div className="hint">Clique para iniciar a Fase Oculta 🌿</div>}

                    {showManual ? (
                        <Manual_Fase_Oculta onStart={() => setShowManual(false)} />
                    ) : (
                        showSelector && (
                            <EscolherPersonagem
                                personagens={personagens}
                                onChoose={handleCharacterChoose}
                                onClose={() => setShowSelector(false)}
                            />
                        )
                    )}
                </>
            )}

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && <Feedback pontuacao={score} onNext={onNext} idJogador={idJogador} fase="fase_oculta" />}


            <Ranking />
            <Credito />
        </div>
    );
}
