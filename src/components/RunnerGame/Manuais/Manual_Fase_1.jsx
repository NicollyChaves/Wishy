// src/components/RunnerGame/Manuais/Manual_Fase_1.jsx
import React from "react";
import "./Manual_Fase_1.css";

import logo from "../../../assets/imagens/runner/Logo.png";
import char1 from "../../../assets/imagens/runner/character1.gif";
import char2 from "../../../assets/imagens/runner/character2.gif";
import char3 from "../../../assets/imagens/runner/character3.gif";
import char4 from "../../../assets/imagens/runner/character4.gif";
import char5 from "../../../assets/imagens/runner/character5.gif";

import tree from "../../../assets/imagens/runner/Cogumelo.png";
import rock from "../../../assets/imagens/runner/Pedra.png";
import star from "../../../assets/imagens/runner/Estrela.png";
import heart from "../../../assets/imagens/runner/Coracao.png";

export default function Manual_Fase_1({ onStart  }) {
    
    return (
        <div className="manual-container">
            <div className="manual-card">
                {/* Logo */}
                <div className="manual-logo">
                    <img src={logo} alt="Logo Jogo" />
                </div>

                <h2>📖 Manual da Fase 1</h2>
                <p className="intro">
                    Bem-vindo à primeira fase! Aqui você aprenderá os controles e os
                    objetivos principais do jogo.
                </p>

                {/* Personagens */}
                <section className="manual-section">
                    <h3>👤 Escolha de Personagem</h3>
                    <div className="char-list">
                        <img src={char1} alt="Gato" />
                        <img src={char2} alt="Galo" />
                        <img src={char3} alt="Cachorro" />
                        <img src={char4} alt="Urso" />
                        <img src={char5} alt="Pato" />
                    </div>
                    <p>Selecione seu herói favorito antes de iniciar a fase.</p>
                </section>

                {/* Controles */}
                <section className="manual-section">
                    <h3>🎮 Controles</h3>
                    <ul>
                        <li>
                            ⬆️ <b>Seta para cima</b>: Faz o personagem pular.
                        </li>
                        <li>
                            🖱️ <b>Clique</b>: Inicia a fase.
                        </li>
                    </ul>
                </section>

                {/* Objetivo */}
                <section className="manual-section">
                    <h3>🎯 Objetivo</h3>
                    <p>
                        Pegue letras, estrelas e corações para ganhar pontos. Desvie dos obstáculos e acerte a primeira letra do objeto para ganhar ainda mais!
                    </p>
                </section>

                {/* Novo bloco - Desafio de Letras */}
                <section className="manual-section">
                    <h3>🔠 Desafio de Letras</h3>
                    <div className="letter-challenge">
                        <span className="emoji">🍎</span>
                        <div className="options">
                            <span className="option correct">M ✅</span>
                            <span className="option wrong">F ❌</span>
                        </div>
                    </div>
                </section>

                {/* Itens */}
                <section className="manual-section">
                    <h3>✨ Itens</h3>
                    <div className="items-list">
                        <div className="item">
                            <img src={tree} alt="Cogumelo" />
                            <span>-10 pontos</span>
                        </div>
                        <div className="item">
                            <img src={rock} alt="Pedra" />
                            <span>-10 pontos</span>
                        </div>
                        <div className="item">
                            <img src={star} alt="Estrela" />
                            <span>+15 pontos</span>
                        </div>
                        <div className="item">
                            <img src={heart} alt="Coração" />
                            <span>+20 pontos</span>
                        </div>
                    </div>
                </section>

                {/* Duração */}
                <section className="manual-section">
                    <h3>⏱️ Tempo</h3>
                    <p>
                        Você terá <b>90 segundos</b> para marcar o máximo de pontos possível!
                    </p>
                </section>

                {/* Botão */}
                <button className="btn-start" onClick={onStart}>
                    🚀 Começar a Fase 1
                </button>
            </div>
        </div>
    );
}
