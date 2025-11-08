// src/components/RunnerGame/Fases/Fase_3.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Fase_3.css";

import bg3 from "../../../assets/imagens/runner/Plano_fundo_3.jpg";
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

// Sons (coloque seus arquivos em src/assets/sounds)
import somBola from "../../../assets/sounds/Bola.mp3";
import somFoca from "../../../assets/sounds/Foca.mp3";
import somLata from "../../../assets/sounds/Lata.mp3";
import somGalo from "../../../assets/sounds/Galo.mp3";

const palavras = [
    { som: somBola, letraCorreta: "B" },
    { som: somFoca, letraCorreta: "F" },
    { som: somLata, letraCorreta: "L" },
    { som: somGalo, letraCorreta: "G" },
];

const obstacles = [
    { type: "tree", img: tree },
    { type: "rock", img: rock },
];

const bonuses = [
    { type: "star", img: star, points: 15 },
    { type: "heart", img: heart, points: 20 },
];

export default function Fase3({ onNext, idJogador }) {
    const [running, setRunning] = useState(false);
    const [character, setCharacter] = useState(null);
    const [score, setScore] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [entities, setEntities] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showSelector, setShowSelector] = useState(true);
    const [timeLeft, setTimeLeft] = useState(10);
    const [letraCorreta, setLetraCorreta] = useState("");
    const [showRecompensa, setShowRecompensa] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [somAtual, setSomAtual] = useState(null);

    const spawnRef = useRef(null);
    const timerRef = useRef(null);
    const somAtualRef = useRef(null);

    const personagens = [
        { name: "Lulix", src: char1 },
        { name: "Rafiki", src: char2 },
        { name: "Nikko", src: char3 },
        { name: "Pippli", src: char4 },
        { name: "Zuppy", src: char5 },
    ];

    // 🔊 Tocar som com segurança
    const tocarSom = (src) => {
        if (somAtualRef.current) {
            somAtualRef.current.pause();
        }
        const audio = new Audio(src);
        somAtualRef.current = audio;
        audio.play().catch(() => {
            console.log("Usuário precisa clicar para permitir o som 🎧");
        });
        setSomAtual(src);
    };

    // Sorteia um novo som e letra
    const tocarSomAleatorio = () => {
        const p = palavras[Math.floor(Math.random() * palavras.length)];
        setLetraCorreta(p.letraCorreta);
        tocarSom(p.som);
    };

    const handleStart = () => {
        if (running || !character) return;
        setRunning(true);
        setScore(0);
        setEntities([]);
        setTimeLeft(90);
        setFinished(false);
        setShowRecompensa(false);
        setShowFeedback(false);

        tocarSomAleatorio();

        // Gera entidades
        spawnRef.current = setInterval(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                const letras = ["A", "B", "C", "D", "E", "F", "G", "L"];
                const letra = letras[Math.floor(Math.random() * letras.length)];
                setEntities((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), type: "letter", char: letra, x: 1000, y: 0 },
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
        }, 2300);

        // Contagem regressiva
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

    // Movimento das entidades
    useEffect(() => {
        if (!running) return;
        const loop = setInterval(() => {
            setEntities((prev) =>
                prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -120)
            );
        }, 30);
        return () => clearInterval(loop);
    }, [running]);

    // Detecção de colisões
    useEffect(() => {
        if (!running) return;
        const check = setInterval(() => {
            setEntities((prev) => {
                const next = [];
                prev.forEach((e) => {
                    const charWidth = 120;
                    const entW = e.type === "letter" ? 60 : 80;
                    const collided =
                        e.x < 200 + charWidth &&
                        e.x + entW > 200 &&
                        e.y < positionY + 120 &&
                        e.y + 60 > positionY;

                    if (collided) {
                        if (e.type === "letter") {
                            if (e.char === letraCorreta) {
                                setScore((s) => s + 10);
                                tocarSomAleatorio(); // toca próximo som
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
    }, [running, positionY, letraCorreta]);

    // Pular
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

    // Finalização
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

    // 🔊 Botão "Ouvir Som Novamente"
    const handleRepetirSom = () => {
        if (somAtual) tocarSom(somAtual);
    };

    return (
        <div className="runner-main" onClick={handleStart}>
            <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg3})` }} />
            <div className="logo-top"><img src={logo} alt="Logo" /></div>

            {!finished && (
                <>
                    {running && (
                        <>
                            <CardPontuacao score={score} />
                            <BarraTempo timeLeft={timeLeft} />
                            <div className="letra-indicada">
                                <button className="btn-repetir" onClick={handleRepetirSom}>
                                    🔊 Ouvir Som
                                </button>
                            </div>
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
                                {e.type === "letter" ? <span className="letter-char">{e.char}</span> : <img src={e.img} alt={e.type} />}
                            </div>
                        ))}

                    {!running && !showSelector && <div className="hint">Clique para começar a Fase 3</div>}

                    {showSelector && (
                        <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} />
                    )}
                </>
            )}

            {showRecompensa && <Recompensa pontuacao={score} />}
            {showFeedback && <Feedback pontuacao={score} onNext={onNext} idJogador={idJogador} fase="fase_3" />}

            <Credito />
        </div>
    );
}
