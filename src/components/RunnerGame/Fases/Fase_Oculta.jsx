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
    const [timeLeft, setTimeLeft] = useState(100);
    const [currentCreature, setCurrentCreature] = useState(creatures[0]);
    const [charPosX, setCharPosX] = useState(100);
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [flashColor, setFlashColor] = useState("");
    const [floatingScores, setFloatingScores] = useState([]);

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

    // 🚀 Iniciar fase
    const handleStart = () => {
        if (running) {
            console.log("⚠️ A fase já está em execução, ignorando novo clique...");
            return;
        }
        if (!character) {
            console.warn("⚠️ Nenhum personagem selecionado — a fase não pode iniciar!");
            return;
        }

        console.log("🌿 Iniciando Fase Oculta...");
        setRunning(true);
        setScore(0);
        setEntities([]);
        setTimeLeft(100);
        setFinished(false);
        setShowRecompensa(false);
        setShowFeedback(false);
        setCurrentCreature(creatures[Math.floor(Math.random() * creatures.length)]);
        setCharPosX(100);

        // 🌿 Spawner de entidades
        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.4) {
                const random = creatures[Math.floor(Math.random() * creatures.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "creature", char: random.img, x: 1000, y: 0 },
                ]);
            } else if (rand < 0.7) {
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

        // 🕓 Temporizador da fase
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    console.log("⏰ Tempo esgotado! Encerrando fase...");
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

    // 🧚‍♀️ Alterna criaturas
    useEffect(() => {
        if (running) {
            emojiTimerRef.current = setInterval(() => {
                setCurrentCreature(creatures[Math.floor(Math.random() * creatures.length)]);
            }, 20000);
        }
        return () => clearInterval(emojiTimerRef.current);
    }, [running]);

    // 🎮 Loop do movimento
    useEffect(() => {
        if (!running) return;
        const loop = setInterval(() => {
            setCharPosX((x) => Math.min(x + 0.6, 350));
            setEntities((prev) =>
                prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -120)
            );
        }, 30);
        return () => clearInterval(loop);
    }, [running]);

    // ⚡ Colisões
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const charWidth = 120;
                    const charHeight = 120;
                    const entW = e.type === "creature" ? 60 : 80;
                    const entH = e.type === "creature" ? 60 : 80;
                    const collided =
                        e.x < charPosX + charWidth &&
                        e.x + entW > charPosX &&
                        e.y < positionY + charHeight &&
                        e.y + entH > positionY;

                    if (collided) {
                        if (e.type === "creature") {
                            setScore((s) => s + 15);
                            addFloatingScore("+15", "green");
                        } else if (e.type === "star" || e.type === "heart") {
                            setScore((s) => s + (e.points || 10));
                            addFloatingScore(`+${e.points}`, "yellow");
                        } else {
                            setScore((s) => Math.max(0, s - 5));
                            addFloatingScore("-5", "red");
                        }
                    } else {
                        next.push(e);
                    }
                });
                return next;
            });
        }, 100);
        return () => clearInterval(check);
    }, [running, positionY, charPosX]);

    // ✨ Pontuação flutuante
    const addFloatingScore = (text, color) => {
        const id = Date.now();
        setFloatingScores((prev) => [...prev, { id, text, color }]);
        setTimeout(() => {
            setFloatingScores((prev) => prev.filter((f) => f.id !== id));
        }, 1000);
    };

    // 🕹️ Pulo
    const handleJump = () => {
        if (!running || isJumping) return;
        setIsJumping(true);
        setPositionY(150);
        setTimeout(() => setPositionY(0), 500);
        setTimeout(() => setIsJumping(false), 800);
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

    // 💾 Salvar pontuação no banco
    useEffect(() => {
        if (finished && idJogador) {
            console.log(`🏁 Fase concluída! Salvando pontuação... (Jogador: ${idJogador}, Pontos: ${score})`);

            const saveScore = async () => {
                try {
                    const response = await fetch("http://localhost:5000/api/jogadores/pontuacao", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id_jogador: idJogador,
                            fase: "fase_oculta",
                            pontuacao: score,
                        }),
                    });

                    if (!response.ok) {
                        console.error(`❌ Erro ao salvar pontuação: ${response.statusText}`);
                    } else {
                        console.log("✅ Pontuação salva com sucesso no servidor!");
                    }
                } catch (error) {
                    console.error("🚫 Erro de conexão com o servidor:", error);
                }
            };

            saveScore();

            setShowRecompensa(true);
            const t = setTimeout(() => {
                setShowRecompensa(false);
                setShowFeedback(true);
            }, 4000);
            return () => clearTimeout(t);
        } else if (finished && !idJogador) {
            console.warn("⚠️ Fase finalizada, mas nenhum 'idJogador' foi fornecido! A pontuação não será salva.");
        }
    }, [finished, idJogador, score]);

    const handleCharacterChoose = (char) => {
        console.log(`🎨 Personagem escolhido: ${char.name}`);
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

            <div className="logo-top"><img src={logo} alt="Logo" /></div>

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
                                {e.type === "creature" ? <span className="letter-char">{e.char}</span> : <img src={e.img} alt={e.type} />}
                            </div>
                        ))}

                    {!running && !showSelector && <div className="hint">Clique para iniciar a Fase Oculta 🌿</div>}

                    {showSelector && (
                        <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} onClose={() => setShowSelector(false)} />
                    )}
                </>
            )}

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && <Feedback pontuacao={score} onNext={onNext} idJogador={idJogador} fase="fase_oculta" />}
            <Credito />
        </div>
    );
}
