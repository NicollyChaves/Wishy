import React, { useState, useEffect, useRef } from "react";
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
import Feedback from "../../Feedback/Feedback";
import Recompensa from "../../Recompensa/Recompensa";
import Ranking from "../../Ranking/Ranking";
import Duvida from "../../Duvida/Duvida";
import Manual_Fase_1 from "../Manuais/Manual_Fase_1";

const words = [
  { img: "🐱", word: "Gato", correct: "G" },
  { img: "🐶", word: "Cachorro", correct: "C" },
  { img: "🍎", word: "Maçã", correct: "M" },
  { img: "🍕", word: "Pizza", correct: "P" },
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

export default function Fase1({ onNext, idJogador }) {
  const [running, setRunning] = useState(false);
  const [character, setCharacter] = useState(null);
  const [score, setScore] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [entities, setEntities] = useState([]);
  const [finished, setFinished] = useState(false);
  const [showSelector, setShowSelector] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [charPosX] = useState(100); // posição fixa do personagem
  const [showRecompensa, setShowRecompensa] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [flashColor, setFlashColor] = useState("");
  const [floatingScores, setFloatingScores] = useState([]);

  const [mostrarDuvida, setMostrarDuvida] = useState(false);

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

    spawnRef.current = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.4) {
        const random = words[Math.floor(Math.random() * words.length)];
        setEntities((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), type: "letter", char: random.correct, x: 1000, y: 0 },
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

  useEffect(() => {
    if (running) {
      emojiTimerRef.current = setInterval(() => {
        setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      }, 10000);
    }
    return () => clearInterval(emojiTimerRef.current);
  }, [running]);

  // 🔥 Remove movimento automático do personagem
  useEffect(() => {
    if (!running) return;
    const loop = setInterval(() => {
      // O personagem não se move mais — apenas os obstáculos se movem
      setEntities((prev) => prev.map((e) => ({ ...e, x: e.x - 8 })).filter((e) => e.x > -120));
    }, 30);
    return () => clearInterval(loop);
  }, [running]);

  // 🎯 Colisões + Flash colorido + Score flutuante (sem contar pontuação durante o pulo)
  useEffect(() => {
    if (!running) return;
    const check = setInterval(() => {
      if (isJumping) return; // não faz checagem de colisão enquanto pula

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
              if (currentWord && e.char === currentWord.correct) {
                setScore((s) => s + 10);
                setFlashColor("green");
                addFloatingScore("+10", "green");

                // 💥 troca o emoji imediatamente ao acertar
                setCurrentWord(words[Math.floor(Math.random() * words.length)]);

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
  }, [running, positionY, charPosX, currentWord, isJumping]);

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
              <div className="emoji-display">{currentWord.img}</div>
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

          {!running && !showSelector && <div className="hint">Clique para começar a Fase 1</div>}

          {showSelector && (
            <EscolherPersonagem personagens={personagens} onChoose={handleCharacterChoose} onClose={() => setShowSelector(false)} />
          )}
        </>
      )}

      <button
        className="botao-duvida"
        onClick={() => setMostrarDuvida(true)}
      >
        ?
      </button>

      {mostrarDuvida && (
        <Duvida onClose={() => setMostrarDuvida(false)}>
          <Manual_Fase_1 />
        </Duvida>
      )}

      {showRecompensa && <Recompensa pontuacao={score} />}
      {showFeedback && <Feedback pontuacao={score} onNext={onNext} idJogador={idJogador} fase="fase_1" />}


      <Ranking />
      <Credito />
    </div>
  );
}
