// src/components/RunnerGame/Fase_2.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_2.css";

import bg2 from "../../../assets/imagens/runner/Plano_fundo_fase_1.jpg"; // pode trocar a imagem de fundo
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

const words = [
    { word: "SOL" },
    { word: "MAR" },
    { word: "LUA" },
    { word: "MAÇÃ" },
    { word: "GATO" },
];

const obstacles = [
    { type: "tree", img: tree },
    { type: "rock", img: rock },
];

const bonuses = [
    { type: "star", img: star, points: 15 },
    { type: "heart", img: heart, points: 20 },
];

export default function Fase2({ onNext }) {
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
    const [charPosX, setCharPosX] = useState(100);
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

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
        setCurrentWord(words[Math.floor(Math.random() * words.length)]);
        setCollectedLetters([]);
        setCharPosX(100);

        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                // gera letras da palavra atual
                const letters = currentWord.word.split("");
                const char = letters[Math.floor(Math.random() * letters.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "letter", char, x: 1000, y: 0 },
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

    // troca a palavra a cada 20s
    useEffect(() => {
        if (running) {
            wordTimerRef.current = setInterval(() => {
                const nextWord = words[Math.floor(Math.random() * words.length)];
                setCurrentWord(nextWord);
                setCollectedLetters([]);
            }, 20000);
        }
        return () => clearInterval(wordTimerRef.current);
    }, [running]);

    // movimento
    useEffect(() => {
        if (!running) return;
        const loop = setInterval(() => {
            setCharPosX((x) => Math.min(x + 0.5, 300));
            setEntities((prev) => prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -120));
        }, 30);
        return () => clearInterval(loop);
    }, [running]);

    // colisões
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
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
                    if (collided) {
                        if (e.type === "letter") {
                            if (currentWord.word.includes(e.char)) {
                                // letra correta
                                setCollectedLetters((c) => [...c, e.char]);
                                setScore((s) => s + 10);
                            } else {
                                // letra não faz parte da palavra atual
                                setScore((s) => Math.max(0, s - 5));
                            }
                        } else if (e.type === "star" || e.type === "heart") {
                            setScore((s) => s + (e.points || 10));
                        } else {
                            // obstáculos só tiram pontos
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
    }, [running, positionY, charPosX, currentWord]);

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
        <div className="runner2-main" onClick={handleStart}>
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg2})` }} />
            <div className="logo-top"><img src={logo} alt="Logo" /></div>

            {!finished && (
                <>
                    {running && (
                        <>
                            <div className="current-word">
                                {currentWord.word.split("").map((l, i) => (
                                    <span key={i} className={collectedLetters.includes(l) ? "collected" : ""}>{l}</span>
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
                            <div key={e.id} className={`entity ${e.type}`} style={{ left: `${e.x}px`, bottom: `${20 + e.y}px` }}>
                                {e.type === "letter" ? <span className="letter-char">{e.char}</span> : <img src={e.img} alt={e.type} />}
                            </div>
                        ))}

                    {!running && !showSelector && <div className="hint">Clique para começar a Fase 2</div>}

                    {showSelector && (
                        <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} onClose={() => setShowSelector(false)} />
                    )}
                </>
            )}

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && <Feedback pontuacao={score} onNext={onNext} />}
            <Credito />
        </div>
    );
}
