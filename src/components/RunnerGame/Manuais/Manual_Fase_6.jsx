// src/components/RunnerGame/Manuais/Manual_Fase_6.jsx
import React from "react";
import "./Manual_Fase_6.css";

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

export default function Manual_Fase_6({ onStart }) {
    return (
        <div className="manual-container">
            <div className="manual-card">
                {/* Logo */}
                <div className="manual-logo">
                    <img src={logo} alt="Logo Jogo" />
                </div>

                <h2>📚 Manual da Fase 6</h2>
                <p className="intro">
                    Nesta fase, você vai ajudar seu personagem a completar frases de forma correta!
                    Use sua atenção e ouça com cuidado — só pegue os emojis que completam as frases certinhas! 🧩✨
                </p>

                {/* Personagens */}
                <section className="manual-section">
                    <h3>👤 Escolha de Personagem</h3>
                    <div className="char-list">
                        <img src={char1} alt="Personagem 1" />
                        <img src={char2} alt="Personagem 2" />
                        <img src={char3} alt="Personagem 3" />
                        <img src={char4} alt="Personagem 4" />
                        <img src={char5} alt="Personagem 5" />
                    </div>
                    <p>Escolha quem vai atravessar a Ponte da Leitura com você! 🏞️</p>
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
                        Complete as frases pegando o emoji correto!
                        Exemplo:
                        <b>“O 🐶 comeu o ___.” → 🍽️</b>
                        Cada acerto mostra a frase completa com som e dá pontos extras! 🎧⭐
                    </p>
                </section>

                {/* Exemplo visual */}
                <section className="manual-section">
                    <h3>💬 Exemplo de Desafio</h3>
                    <div className="sentence-challenge">
                        <span className="sentence">“A 🦋 voa no ___.”</span>
                        <div className="options">
                            <span className="option wrong">🍕 ❌</span>
                            <span className="option correct">🌳 ✅</span>
                        </div>
                    </div>
                </section>

                {/* Itens */}
                <section className="manual-section">
                    <h3>✨ Itens na Fase</h3>
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

                {/* Tempo */}
                <section className="manual-section">
                    <h3>⏱️ Tempo</h3>
                    <p>
                        Você terá <b>30 segundos</b> para completar o máximo de frases possíveis!
                        Mostre sua atenção e boa leitura! 📖💪
                    </p>
                </section>

                {/* Botão */}
                <button className="btn-start" onClick={onStart}>
                    🚀 Começar a Fase 6
                </button>
            </div>
        </div>
    );
}
