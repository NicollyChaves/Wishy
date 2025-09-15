// src/components/RunnerGame/CharacterSelect.jsx
import React from "react";
import char1 from "../../assets/imagens/runner/character1.png";
import char2 from "../../assets/imagens/runner/character2.png";

export default function CharacterSelect({ onClose, onChoose }) {
  const options = [
    { name: "Ursinho", src: char1 },
    { name: "Robozinho", src: char2 },
  ];

  return (
    <div className="char-modal" onClick={onClose}>
      <div className="char-card" onClick={(e) => e.stopPropagation()}>
        <h3>Escolha seu personagem</h3>
        <div className="char-list">
          {options.map((c) => (
            <button
              key={c.name}
              className="char-option"
              onClick={() => {
                onChoose(c);
              }}
            >
              <img src={c.src} alt={c.name} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
        <button className="close" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
