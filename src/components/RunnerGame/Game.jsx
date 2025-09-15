// src/components/RunnerGame/Game.jsx
import React, { useState, useRef } from "react";
import "./Game.css";

// importa imagens (ajuste os caminhos conforme suas imagens reais)
import bg1 from "../../assets/imagens/runner/bg-layer1.jpg";
import bg2 from "../../assets/imagens/runner/bg-layer2.jpg";
import bg3 from "../../assets/imagens/runner/bg-layer3.jpg";
import char1 from "../../assets/imagens/runner/character1.png";
import char2 from "../../assets/imagens/runner/character2.png"; // exemplo de outro personagem

export default function Game() {
  const [running, setRunning] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [character, setCharacter] = useState({ name: "Gohan", src: char1 });
  const [score, setScore] = useState(0);
  const containerRef = useRef(null);

  // iniciar jogo ao clicar
  const handleStart = () => {
    if (running) return; // evita reiniciar clicando
    setRunning(true);
    setScore(0);

    // exemplo: aumentar pontuação a cada segundo
    let points = 0;
    const interval = setInterval(() => {
      points++;
      setScore(points);
    }, 1000);

    // parar jogo após 20s (exemplo)
    setTimeout(() => {
      clearInterval(interval);
      setRunning(false);
    }, 20000);
  };

  const openSelector = (e) => {
    e.stopPropagation();
    setShowSelector(true);
  };

  const onCharacterChosen = (ch) => {
    setCharacter(ch);
    setShowSelector(false);
  };

  return (
    <div
      className={`runner-main ${running ? "running" : ""}`}
      onClick={handleStart}
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="Clique para iniciar o jogo"
    >
      {/* fundo em camadas */}
      <div className="bg-layer layer1" style={{ backgroundImage: `url(${bg1})` }} />
      <div className="bg-layer layer2" style={{ backgroundImage: `url(${bg2})` }} />
      <div className="bg-layer layer3" style={{ backgroundImage: `url(${bg3})` }} />

      {/* UI: botões */}
      <div className="ui-top">
        <button
          className="btn select-btn"
          onClick={(e) => {
            openSelector(e);
          }}
        >
          🎭 Escolher Personagem
        </button>
        {running && (
          <div className="btn reward-btn" onClick={(e) => e.stopPropagation()}>
            ⭐ Pontos: {score}
          </div>
        )}
      </div>

      {/* Personagem */}
      <div
        className={`character-wrap ${running ? "start" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={character.src}
          alt={character.name}
          className={`character ${running ? "run" : "idle"}`}
        />
      </div>

      {/* instrução */}
      {!running && <div className="hint">Toque em qualquer lugar para jogar</div>}

      {/* modal de seleção */}
      {showSelector && (
        <div className="char-modal" onClick={() => setShowSelector(false)}>
          <div className="char-card" onClick={(e) => e.stopPropagation()}>
            <h2>Escolha seu personagem</h2>
            <div className="char-list">
              <button
                className="char-option"
                onClick={() => onCharacterChosen({ name: "Gohan", src: char1 })}
              >
                <img src={char1} alt="Gohan" />
                <span>Gohan</span>
              </button>
              <button
                className="char-option"
                onClick={() => onCharacterChosen({ name: "Goku", src: char2 })}
              >
                <img src={char2} alt="Goku" />
                <span>Goku</span>
              </button>
            </div>
            <button className="close" onClick={() => setShowSelector(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
