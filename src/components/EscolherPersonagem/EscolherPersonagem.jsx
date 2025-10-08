import React from "react";
import "./EscolherPersonagem.css";

export default function EscolherPersonagem({ personagens, onChoose, onClose }) {
    return (
        <div className="char-modal" onClick={onClose}>
            <div className="char-card" onClick={(e) => e.stopPropagation()}>
                <h2>Escolha seu personagem</h2>
                <div className="char-list">
                    {personagens.map((char, index) => (
                        <button
                            key={index}
                            className="char-option"
                            onClick={() => onChoose(char)}
                        >
                            <img src={char.src} alt={char.name} />
                            <span>{char.name}</span>
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
