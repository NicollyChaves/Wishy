// src/components/RunnerGame/Fase_7.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_7.css";
import Ranking from "../../Ranking/Ranking";

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

export default function Fase7({ onNext, idJogador }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [entities, setEntities] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showSelector, setShowSelector] = useState(true);
    const [timeLeft, setTimeLeft] = useState(5);
    const [storyParts, setStoryParts] = useState([]);
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const [showRanking, setShowRanking] = useState(false);

    const spawnRef = useRef(null);
    const timerRef = useRef(null);

    const personagens = [
        { name: "Lulix", src: char1 },
        { name: "Rafiki", src: char2 },
        { name: "Nikko", src: char3 },
        { name: "Pippli", src: char4 },
        { name: "Zuppy", src: char5 },
    ];

    const phrases = [
        { text: "Era uma vez", id: 1 },
        { text: "um gato feliz", id: 2 },
        { text: "que adorava brincar", id: 3 },
        { text: "no parque!", id: 4 },
    ];

    const obstacles = [
        { type: "tree", img: tree },
        { type: "rock", img: rock },
    ];

    const bonuses = [
        { type: "star", img: star, points: 15 },
        { type: "heart", img: heart, points: 20 },
    ];

    const handleStart = () => {
        if (running || !character) {
            console.warn("⚠️ Não é possível iniciar: jogo já em andamento ou personagem não escolhido.");
            return;
        }

        console.log("🏁 Iniciando fase 7 com personagem:", character.name);
        setRunning(true);
        setScore(0);
        setEntities([]);
        setStoryParts([]);
        setFinished(false);
        setShowRecompensa(false);
        setShowFeedback(false);
        setTimeLeft(60);

        // Cria os elementos na tela
        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.4) {
                const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now(), type: "word", text: randomPhrase.text, phraseId: randomPhrase.id, x: 1000, y: 0 },
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
        }, 2500);

        // Controla o tempo
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    console.log("⏰ Tempo acabou!");
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

    // Movimento dos elementos
    useEffect(() => {
        if (!running) return;
        const loop = setInterval(() => {
            setEntities((prev) =>
                prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -150)
            );
        }, 30);
        return () => clearInterval(loop);
    }, [running]);

    // Colisões
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const collided = e.x < 220 && e.x > 50 && e.y < 100;
                    if (collided) {
                        console.log("💥 Colisão detectada com:", e.type);
                        if (e.type === "word") {
                            setStoryParts((parts) => {
                                if (!parts.find((p) => p.id === e.phraseId)) {
                                    setScore((s) => s + 10);
                                    return [...parts, e];
                                }
                                return parts;
                            });
                        } else if (e.type === "star" || e.type === "heart") {
                            setScore((s) => s + (e.points || 10));
                        } else {
                            setScore((s) => Math.max(0, s - 10));
                        }
                    } else next.push(e);
                });
                return next;
            });
        }, 100);
        return () => clearInterval(check);
    }, [running]);

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

    // Finalização da fase
    useEffect(() => {
        if (finished) {
            console.log("🏆 Fase finalizada! Pontuação:", score);
            setShowRecompensa(true);
            const t = setTimeout(() => {
                setShowRecompensa(false);
                setShowFeedback(true);
            }, 4000);
            return () => clearTimeout(t);
        }
    }, [finished]);

    const handleCharacterChoose = (char) => {
        console.log("🎭 Personagem escolhido:", char.name);
        setCharacter(char);
        setShowSelector(false);
    };

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

    // 🔹 Quando Feedback terminar (ex: após clicar “Próxima Fase”), abrir o Ranking
    const handleNext = () => {
        setShowFeedback(false);
        setShowRanking(true);
    };


    return (
        <div className="runner-main" onClick={handleStart}>
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg1})` }} />
            <div className="logo-top"><img src={logo} alt="Logo" /></div>

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
                            style={{ bottom: `${20 + positionY}px` }}
                        >
                            <img src={character.src} alt={character.name} className="character" />
                        </div>
                    )}

                    {running &&
                        entities.map((e) => (
                            <div key={e.id} className={`entity ${e.type}`} style={{ left: `${e.x}px`, bottom: `${20 + e.y}px` }}>
                                {e.type === "word" ? (
                                    <span className="word-text">{e.text}</span>
                                ) : (
                                    <img src={e.img} alt={e.type} />
                                )}
                            </div>
                        ))}

                    {!running && !showSelector && <div className="hint">Clique para começar a Corrida Final 🏁</div>}

                    {showSelector && (
                        <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} />
                    )}
                </>
            )}

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && (
                <Feedback
                    pontuacao={score}
                    onNext={() => {
                        console.log("🏁 Exibindo ranking antes de avançar...");
                        setShowFeedback(false);
                        setShowRanking(true);
                        // ⏳ Depois de 5 segundos, chama o onNext() real
                        setTimeout(() => {
                            try {
                                onNext();
                            } catch (err) {
                                console.error("❌ Erro ao chamar onNext:", err);
                            }
                        }, 5000);
                    }}
                    idJogador={idJogador}
                    fase="fase_7"
                />
            )}

            {showRanking && <Ranking onClose={() => setShowRanking(false)} />}

            {finished && storyParts.length > 0 && (
                <div className="story-popup">
                    <h3>📜 Sua cartinha final:</h3>
                    <p>{storyParts.map((p) => p.text).join(" ")}</p>
                </div>
            )}

            <Credito />
        </div>
    );
}
