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

import Credito from "../../creditos/Creditos";
import BarraTempo from "../../BarraTempo/BarraTempo";
import CardPontuacao from "../../CardPontuacao/CardPontuacao";
import EscolherPersonagem from "../../EscolherPersonagem/EscolherPersonagem";

const words = [
  { img: "🐱", word: "Gato", correct: "G" },
  { img: "🐶", word: "Cachorro", correct: "C" },
  { img: "🍎", word: "Maçã", correct: "M" },
  { img: "🚗", word: "Carro", correct: "C" },
  { img: "🌳", word: "Árvore", correct: "A" },
];

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
  const [timeLeft, setTimeLeft] = useState(90);
  const [currentWord, setCurrentWord] = useState(words[0]);

  const gravity = 0.6;
  const jumpStrength = -12;
  const groundLevel = 0;

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
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);

    const spawn = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.4) {
        const random = words[Math.floor(Math.random() * words.length)];
        setEntities((prev) => [
          ...prev,
          { id: Date.now(), type: "letter", char: random.correct, x: 1000, y: groundLevel },
        ]);
      } else if (rand < 0.7) {
        const obs = obstacles[Math.floor(Math.random() * obstacles.length)];
        setEntities((prev) => [...prev, { id: Date.now(), type: obs.type, img: obs.img, x: 1000, y: groundLevel }]);
      } else {
        const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
        setEntities((prev) => [...prev, { id: Date.now(), type: bonus.type, img: bonus.img, x: 1000, y: groundLevel }]);
      }
    }, 2500);

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
  }, [running, velocity]);

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

  const handleCharacterChoose = (char) => {
    setCharacter(char);
    setShowSelector(false);
  };

  return (
    <div className="runner-main" onClick={handleStart}>
      <div className="bg-layer fixed" style={{ backgroundImage: `url(${bg1})` }} />
      <div className="logo-top"><img src={logo} alt="Logo Balão" /></div>

      {!finished && (
        <>
          {running && (
            <>
              <div className="emoji-display">{currentWord.img}</div>
              <CardPontuacao score={score} />
              <BarraTempo timeLeft={timeLeft} />
            </>
          )}

          {character && (
            <div className="character-wrap" style={{ bottom: `${20 + positionY}px` }}>
              <img src={character.src} alt={character.name} className={`character ${running ? "run" : "idle"}`} />
            </div>
          )}

          {running &&
            entities.map((e) => (
              <div key={e.id} className={`entity ${e.type}`} style={{ left: `${e.x}px`, bottom: `${20 + e.y}px` }}>
                {e.type === "letter" ? e.char : <img src={e.img} alt={e.type} />}
              </div>
            ))}

          {!running && !showSelector && <div className="hint">Clique para começar a Fase 1</div>}

          {showSelector && (
            <EscolherPersonagem
              personagens={personagens}
              onChoose={handleCharacterChoose}
              onClose={() => setShowSelector(false)}
            />
          )}
        </>
      )}

      {finished && (
        <div className="end-modal">
          <div className="end-card confetti-container">
            <h2>🎉 Parabéns!</h2>
            <p>Você concluiu a fase com {score} pontos!</p>
            <button onClick={onNext}>Próxima Fase</button>
          </div>
        </div>
      )}

      <Credito />
    </div>
  );
}
