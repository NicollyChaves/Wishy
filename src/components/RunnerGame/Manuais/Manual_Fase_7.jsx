// src/components/RunnerGame/Manuais/Manual_Fase_7.jsx
import React from "react";
import "./Manual_Fase_7.css";

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

export default function Manual_Fase_7({ onStart }) {
    return (
        <div className="manual-container">
            <div className="manual-card">
                {/* Logo */}
                <div className="manual-logo">
                    <img src={logo} alt="Logo Jogo" />
                </div>

                <h2>📖 Manual da Fase 7 — A Grande Corrida Final 🏁</h2>
                <p className="intro">
                    Chegamos ao grande final! Nesta fase, você vai usar tudo o que aprendeu
                    nas aventuras anteriores para formar uma história mágica! 🌈✨
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
                    <p>
                        Escolha seu herói favorito para participar da grande corrida final e completar a história! 💫
                    </p>
                </section>

                {/* Controles */}
                <section className="manual-section">
                    <h3>🎮 Controles</h3>
                    <ul>
                        <li>⬆️ <b>Seta para cima</b>: Faz o personagem pular.</li>
                        <li>🖱️ <b>Clique</b>: Inicia a corrida.</li>
                    </ul>
                </section>

                {/* Objetivo */}
                <section className="manual-section">
                    <h3>🎯 Objetivo</h3>
                    <p>
                        Colete <b>palavras inteiras</b> para formar a cartinha final.
                        Cada palavra certa adiciona uma parte da história, como:
                    </p>
                    <div className="story-demo">
                        <p>“Era uma vez...” ➕ “um gato feliz...” ➕ “que adorava brincar no parque!” 📜</p>
                    </div>
                    <p>
                        No final, a história completa aparece com o seu personagem e uma linda mensagem! 🥳
                    </p>
                </section>

                {/* Itens */}
                <section className="manual-section">
                    <h3>✨ Itens e Pontuação</h3>
                    <div className="items-list">
                        <div className="item">
                            <img src={star} alt="Estrela" />
                            <span>+15 pontos (Bônus 🌟)</span>
                        </div>
                        <div className="item">
                            <img src={heart} alt="Coração" />
                            <span>+20 pontos (Bônus 💖)</span>
                        </div>
                        <div className="item">
                            <img src={tree} alt="Cogumelo" />
                            <span>-10 pontos (Cuidado! 🍄)</span>
                        </div>
                        <div className="item">
                            <img src={rock} alt="Pedra" />
                            <span>-10 pontos (Obstáculo 🪨)</span>
                        </div>
                    </div>
                </section>

                {/* Duração */}
                <section className="manual-section">
                    <h3>⏱️ Tempo</h3>
                    <p>
                        Você terá <b>90 segundos</b> para coletar as palavras e formar sua cartinha mágica! 💌
                    </p>
                </section>

                {/* Dica */}
                <section className="manual-section">
                    <h3>💡 Dica Final</h3>
                    <p>
                        Pegue apenas as palavras certas para formar a história.
                        Desvie dos obstáculos e colete estrelas e corações para ganhar bônus! 🌟💖
                    </p>
                </section>

                {/* Botão */}
                <button className="btn-start" onClick={onStart}>
                    🚀 Começar a Fase 7
                </button>
            </div>
        </div>
    );
}
