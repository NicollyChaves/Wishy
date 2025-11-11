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
import Ranking from "../../Ranking/Ranking";

// 👇 Cenas do cotidiano
const cenas = [
    { emoji: "🏫", frase: "Ir para a escola", correta: "Estudar", opcoes: ["Estudar", "Cama", "Bola", "Chuva"] },
    { emoji: "🛏️", frase: "Hora de dormir", correta: "Cama", opcoes: ["Flor", "Cama", "Escola", "Copo"] },
    { emoji: "🛝", frase: "Brincar com os amigos", correta: "Bicicleta", opcoes: ["Cadeira", "Pão", "Bicicleta", "Janela"] },
    { emoji: "🏠", frase: "Voltar pra casa", correta: "Casa", opcoes: ["Escola", "Casa", "Janela", "Cama"] },
    { emoji: "🛒", frase: "Fazer compras", correta: "Mercado", opcoes: ["Mercado", "Praia", "Parque", "Carro"] },
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
    const [timeLeft, setTimeLeft] = useState(30);
    const [cenaAtual, setCenaAtual] = useState(cenas[0]);
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [flashColor, setFlashColor] = useState("");
    const [floatingScores, setFloatingScores] = useState([]);

    const spawnRef = useRef(null);
    const timerRef = useRef(null);
    const cenaTimerRef = useRef(null);

    const personagens = [
        { name: "Lulix", src: char1 },
        { name: "Rafiki", src: char2 },
        { name: "Nikko", src: char3 },
        { name: "Pippli", src: char4 },
        { name: "Zuppy", src: char5 },
    ];

    // 🚀 Inicia a fase
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

        // ✨ Alterar cena a cada 10 segundos
        cenaTimerRef.current = setInterval(() => {
            setCenaAtual(cenas[Math.floor(Math.random() * cenas.length)]);
        }, 10000);

        // 🎯 Spawns (com maior probabilidade de aparecer a palavra correta)
        spawnRef.current = setInterval(() => {
            const rand = Math.random();

            if (rand < 0.6) {
                // 60% de chance de gerar palavra (com mais chance da correta aparecer)
                const showCorreta = Math.random() < 0.5; // 50% chance de ser a correta
                const palavra = showCorreta
                    ? cenaAtual.correta
                    : cenaAtual.opcoes[Math.floor(Math.random() * cenaAtual.opcoes.length)];

                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "word", text: palavra, x: 1000, y: 0 },
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
        }, 2500);

        // ⏳ Contagem regressiva
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    clearInterval(spawnRef.current);
                    clearInterval(cenaTimerRef.current);
                    setRunning(false);
                    setFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // 🌀 Movimento dos obstáculos
    useEffect(() => {
        if (!running) return;
        const loop = setInterval(() => {
            setEntities((prev) => prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -150));
        }, 30);
        return () => clearInterval(loop);
    }, [running]);

    // 💥 Colisões e pontuação
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            if (isJumping) return;

            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const charX = 200;
                    const charW = 100;
                    const collided = e.x < charX + charW && e.x + 60 > charX && positionY < 100;

                    if (collided && !e.hit) {
                        e.hit = true;

                        if (e.type === "word") {
                            if (e.text === cenaAtual.correta) {
                                setScore((s) => s + 10);
                                setFlashColor("green");
                                addFloatingScore("+10", "green");
                                setCenaAtual(cenas[Math.floor(Math.random() * cenas.length)]);
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
    }, [running, positionY, cenaAtual, isJumping]);

    // ✨ Pontos flutuantes
    const addFloatingScore = (text, color) => {
        const id = `${Date.now()}-${Math.random()}`;
        setFloatingScores((prev) => [...prev, { id, text, color }]);
        setTimeout(() => setFloatingScores((prev) => prev.filter((f) => f.id !== id)), 1000);
    };

    // 🦘 Pulo
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

    useEffect(() => {
        if (finished) {
            clearInterval(cenaTimerRef.current);
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
                        <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} onClose={() => setShowSelector(false)} />
                    )}
                </>
            )}

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && <Feedback pontuacao={score} onNext={onNext} idJogador={idJogador} fase="fase_4" />}


            <Ranking />
            <Credito />
        </div>
    );
}
