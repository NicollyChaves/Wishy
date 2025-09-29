// src/components/RunnerGame/Fase1.jsx
import React, { useState, useEffect } from "react";
import "./Fase_1.css";

import bg1 from "../../../assets/imagens/runner/Plano_fundo_fase_1.jpg";
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

// palavras + letra inicial correta
const words = [
  { img: "🐱", word: "Gato", correct: "G" },
  { img: "🐶", word: "Cachorro", correct: "C" },
  { img: "🍎", word: "Maçã", correct: "M" },
  { img: "🚗", word: "Carro", correct: "C" },
  { img: "🌳", word: "Árvore", correct: "A" },
];

// obstáculos e bônus
const obstacles = [
  { type: "tree", img: tree },
  { type: "rock", img: rock },
];

const bonuses = [
  { type: "star", img: star, points: 15 },
  { type: "heart", img: heart, points: 20 },
];

export default function Fase1({ onNext }) {
  const [running, setRunning] = useState(false);
  const [character, setCharacter] = useState(null);
  const [score, setScore] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const [entities, setEntities] = useState([]);
  const [finished, setFinished] = useState(false);
  const [showSelector, setShowSelector] = useState(true);

  const [timeLeft, setTimeLeft] = useState(40); // segundos

  const gravity = 0.6;
  const jumpStrength = -12;
  const groundLevel = 0;

  // inicia fase
  const handleStart = () => {
    if (running || !character) return;
    setRunning(true);
    setScore(0);
    setEntities([]);
    setTimeLeft(40);

    const spawn = setInterval(() => {
      const rand = Math.random();

      if (rand < 0.4) {
        const random = words[Math.floor(Math.random() * words.length)];
        setEntities((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "letter",
            char: random.correct,
            x: 1000,
            y: groundLevel,
          },
        ]);
      } else if (rand < 0.7) {
        const obs = obstacles[Math.floor(Math.random() * obstacles.length)];
        setEntities((prev) => [
          ...prev,
          { id: Date.now(), type: obs.type, img: obs.img, x: 1000, y: groundLevel },
        ]);
      } else {
        const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
        setEntities((prev) => [
          ...prev,
          { id: Date.now(), type: bonus.type, img: bonus.img, x: 1000, y: groundLevel },
        ]);
      }
    }, 2500);

    // cronômetro
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearInterval(spawn);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // física do pulo
  useEffect(() => {
    if (!running) return;

    const loop = setInterval(() => {
      setPositionY((prev) => {
        let newY = prev + velocity;
        if (newY <= groundLevel) {
          newY = groundLevel;
          setIsJumping(false);
          setVelocity(0);
        }
        return newY;
      });

      setVelocity((v) => v + gravity);

      setEntities((prev) =>
        prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -100)
      );
    }, 30);

    return () => clearInterval(loop);
  }, [running, velocity]); // ✅ incluído velocity

  // controle teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (!running) return;
      if (e.key === "ArrowUp" && !isJumping) {
        setIsJumping(true);
        setVelocity(jumpStrength);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running, isJumping]);

  // colisões
  useEffect(() => {
    if (!running) return;

    const checkCollisions = setInterval(() => {
      setEntities((prevEntities) => {
        const newEntities = [];

        prevEntities.forEach((e) => {
          const charX = 100;
          const charY = positionY;
          const charWidth = 80;
          const charHeight = 80;

          if (
            e.x < charX + charWidth &&
            e.x + 50 > charX &&
            e.y < charY + charHeight &&
            e.y + 50 > charY
          ) {
            if (e.type === "letter") {
              setScore((s) => s + 10);
            } else if (e.type === "star" || e.type === "heart") {
              const bonus = bonuses.find((b) => b.type === e.type);
              setScore((s) => s + bonus.points);
            } else {
              setScore((s) => (s > 0 ? s - 10 : 0));
            }
          } else {
            newEntities.push(e);
          }
        });

        return newEntities;
      });
    }, 100);

    return () => clearInterval(checkCollisions);
  }, [running, positionY]);

  const onCharacterChosen = (char) => {
    setCharacter(char);
    setShowSelector(false);
  };

  return (
    <div className="runner-main" onClick={handleStart}>
      <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg1})` }} />

      <div className="logo-top">
        <img src={logo} alt="Logo Balão" />
      </div>

      {!finished && (
        <>
          <div className="ui-top">
            {running && <div className="btn reward-btn">⭐ Pontos: {score}</div>}
          </div>

          {/* barra de tempo */}
          {running && (
            <div className="time-bar">
              <div className="time-fill" style={{ height: `${(timeLeft / 60) * 100}%` }} />
            </div>
          )}

          {character && (
            <div
              className="character-wrap"
              style={{ bottom: `${20 + positionY}px` }}
            >
              <img
                src={character.src}
                alt={character.name}
                className={`character ${running ? "run" : "idle"}`}
              />
            </div>
          )}

          {running &&
            entities.map((e) => (
              <div
                key={e.id}
                className={`entity ${e.type}`}
                style={{ left: `${e.x}px`, bottom: `${20 + e.y}px` }}
              >
                {e.type === "letter" ? e.char : <img src={e.img} alt={e.type} />}
              </div>
            ))}

          {!running && !showSelector && (
            <div className="hint">Clique para começar a Fase 1</div>
          )}

          {showSelector && (
            <div className="char-modal" onClick={() => setShowSelector(false)}>
              <div className="char-card" onClick={(e) => e.stopPropagation()}>
                <h2>Escolha seu personagem</h2>
                <div className="char-list">
                  <button
                    className="char-option"
                    onClick={() => onCharacterChosen({ name: "Lulix", src: char1 })}
                  >
                    <img src={char1} alt="Lulix" />
                    <span>Lulix</span>
                  </button>
                  <button
                    className="char-option"
                    onClick={() => onCharacterChosen({ name: "Rafiki", src: char2 })}
                  >
                    <img src={char2} alt="Rafiki" />
                    <span>Rafiki</span>
                  </button>
                  <button
                    className="char-option"
                    onClick={() => onCharacterChosen({ name: "Nikko", src: char3 })}
                  >
                    <img src={char3} alt="Nikko" />
                    <span>Nikko</span>
                  </button>
                  <button
                    className="char-option"
                    onClick={() => onCharacterChosen({ name: "Pippli", src: char4 })}
                  >
                    <img src={char4} alt="Pippli" />
                    <span>Pippli</span>
                  </button>
                  <button
                    className="char-option"
                    onClick={() => onCharacterChosen({ name: "Zuppy", src: char5 })}
                  >
                    <img src={char5} alt="Zuppy" />
                    <span>Zuppy</span>
                  </button>
                </div>
                <button className="close" onClick={() => setShowSelector(false)}>
                  Fechar
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {finished && (
        <div className="end-modal">
          <div className="end-card confetti-container">
            <h2>🎉 Parabéns!</h2>
            <p>Você concluiu a fase com {score} pontos!</p>
            <button onClick={onNext}>Próxima Fase</button>

            {/* confetes caindo */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="confetti" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
