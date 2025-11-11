// src/components/RunnerGame/Manuais/Manual_Fase_2.jsx
import React from "react";
import "./Manual_Fase_2.css";

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

export default function Manual_Fase_2({ onStart }) {
    return (
        <div className="manual-container">
            <div className="manual-card">
                {/* Logo */}
                <div className="manual-logo">
                    <img src={logo} alt="Logo Fase 2" />
                </div>

                <h2>📖 Manual da Fase 2</h2>
                <p className="intro">
                    Bem-vindo à segunda fase! Agora o desafio ficou mais difícil.
                    Preste atenção nas letras e nos obstáculos.
                </p>

                {/* Personagens */}
                <section className="manual-section">
                    <h3>👤 Escolha de Personagem</h3>
                    <div className="char-list">
                        <img src={char1} alt="Lulix" />
                        <img src={char2} alt="Rafiki" />
                        <img src={char3} alt="Nikko" />
                        <img src={char4} alt="Pippli" />
                        <img src={char5} alt="Zuppy" />
                    </div>
                    <p>Selecione seu herói favorito antes de iniciar a fase.</p>
                </section>

                {/* Controles */}
                <section className="manual-section">
                    <h3>🎮 Controles</h3>
                    <ul>
                        <li>⬆️ <b>Seta para cima</b>: Faz o personagem pular.</li>
                        <li>🖱️ <b>Clique</b>: Inicia a fase.</li>
                    </ul>
                </section>

                {/* Objetivo */}
                <section className="manual-section">
                    <h3>🎯 Objetivo</h3>
                    <p>
                        Colete as letras corretas para formar a palavra atual e ganhe pontos.
                        Pegue estrelas e corações para bônus. Desvie de pedras e cogumelos!
                    </p>
                </section>

                {/* Desafio de Letras */}
                <section className="manual-section">
                    <h3>🔠 Desafio de Letras</h3>
                    <p>
                        Apenas letras que pertencem à palavra atual irão somar pontos.
                        Letras erradas subtraem pontos.
                    </p>
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
                        Você terá <b>30 segundos</b> para marcar o máximo de pontos possível!
                    </p>
                </section>

                {/* Botão */}
                <button className="btn-start" onClick={onStart}>
                    🚀 Começar a Fase 2
                </button>
            </div>
        </div>
    );
}
