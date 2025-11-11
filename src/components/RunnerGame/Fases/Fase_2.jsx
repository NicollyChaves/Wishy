// src/components/RunnerGame/Fase_2.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_2.css";

import bg2 from "../../../assets/imagens/runner/Plano_fundo_fase_1.jpg";
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
import Feedback from "../../Feedback/Feedback";
import Recompensa from "../../Recompensa/Recompensa";
import EscolherPersonagem from "../../EscolherPersonagem/EscolherPersonagem";
import Ranking from "../../Ranking/Ranking";
import Duvida from "../../Duvida/Duvida";
import Manual_Fase_2 from "../Manuais/Manual_Fase_2";

const words = [
    { word: "SOL" },
    { word: "MAR" },
    { word: "LUA" },
    { word: "MAÇÃ" },
    { word: "GATO" },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃ".split(""); // inclui Ç e Ã

const obstacles = [
    { type: "tree", img: tree },
    { type: "rock", img: rock },
];

const bonuses = [
    { type: "star", img: star, points: 15 },
    { type: "heart", img: heart, points: 20 },
];

export default function Fase2({ onNext, idJogador }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [entities, setEntities] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showSelector, setShowSelector] = useState(true);
    const [timeLeft, setTimeLeft] = useState(90);
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [collectedLetters, setCollectedLetters] = useState([]);
    const [charPosX] = useState(100);
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [flashColor, setFlashColor] = useState("");
    const [floatingScores, setFloatingScores] = useState([]);

    const spawnRef = useRef(null);
    const timerRef = useRef(null);
    const wordTimerRef = useRef(null);

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
        setCollectedLetters([]);
        setCurrentWord(words[Math.floor(Math.random() * words.length)]);

        // gerar entidades (letras, obstáculos e bônus)
        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "letter", char: randomChar, x: 1000, y: 0 },
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

        // cronômetro
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

    // troca automática da palavra a cada 15 segundos
    useEffect(() => {
        if (running) {
            wordTimerRef.current = setInterval(() => {
                const nextWord = words[Math.floor(Math.random() * words.length)];
                setCurrentWord(nextWord);
                setCollectedLetters([]);
            }, 15000);
        }
        return () => clearInterval(wordTimerRef.current);
    }, [running]);

    // troca a palavra se o jogador completar todas as letras
    useEffect(() => {
        if (running && collectedLetters.length >= new Set(currentWord.word).size) {
            const nextWord = words[Math.floor(Math.random() * words.length)];
            setCurrentWord(nextWord);
            setCollectedLetters([]);
        }
    }, [collectedLetters, running]);

    // movimentação dos elementos (personagem fixo)
    useEffect(() => {
        if (!running) return;
        const loop = setInterval(() => {
            setEntities((prev) =>
                prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -120)
            );
        }, 30);
        return () => clearInterval(loop);
    }, [running]);

    // 💥 colisões + flashes + pontuação flutuante
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            if (isJumping) return;
            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const charWidth = 120;
                    const charHeight = 120;
                    const entW = e.type === "letter" ? 60 : 80;
                    const entH = e.type === "letter" ? 60 : 80;
                    const collided =
                        e.x < charPosX + charWidth &&
                        e.x + entW > charPosX &&
                        e.y < positionY + charHeight &&
                        e.y + entH > positionY;

                    if (collided && !e.hit) {
                        e.hit = true;

                        if (e.type === "letter") {
                            if (currentWord.word.includes(e.char)) {
                                if (!collectedLetters.includes(e.char)) {
                                    setCollectedLetters((c) => [...c, e.char]);
                                    setScore((s) => s + 10);
                                    setFlashColor("green");
                                    addFloatingScore("+10", "green");
                                }
                            } else {
                                setScore((s) => Math.max(0, s - 5));
                                setFlashColor("red");
                                addFloatingScore("-5", "red");
                            }
                        } else if (e.type === "star" || e.type === "heart") {
                            setScore((s) => s + (e.points || 10));
                            setFlashColor("green");
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
    }, [running, positionY, charPosX, currentWord, isJumping, collectedLetters]);

    // 🌀 animação da pontuação flutuante
    const addFloatingScore = (text, color) => {
        const id = `${Date.now()}-${Math.random()}`;
        setFloatingScores((prev) => [...prev, { id, text, color }]);
        setTimeout(() => {
            setFloatingScores((prev) => prev.filter((f) => f.id !== id));
        }, 1000);
    };

    // 🦘 pulo igual da Fase 1
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
    });

    // fim da fase
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
        <div className="runner2-main" onClick={handleStart}>
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg2})` }} />

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
                            <div className="current-word">
                                {currentWord.word.split("").map((l, i) => (
                                    <span key={i} className={collectedLetters.includes(l) ? "collected" : ""}>
                                        {l}
                                    </span>
                                ))}
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
                                {e.type === "letter" ? (
                                    <span className="letter-char">{e.char}</span>
                                ) : (
                                    <img src={e.img} alt={e.type} />
                                )}
                            </div>
                        ))}

                    {!running && !showSelector && (
                        <div className="hint">Clique para começar a Fase 2</div>
                    )}

                    {showSelector && (
                        <EscolherPersonagem
                            personagens={personagens}
                            onChoose={handleCharacterChoose}
                            onClose={() => setShowSelector(false)}
                        />
                    )}
                </>
            )}

            <Duvida>
                <Manual_Fase_2 />
            </Duvida>

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && (
                <Feedback pontuacao={score} onNext={onNext} idJogador={idJogador} fase="fase_2" />
            )}

            <Ranking />
            <Credito />
        </div>
    );
}
