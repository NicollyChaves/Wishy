// src/components/RunnerGame/Manuais/Manual_Fase_7.jsx
import React from "react";
import "./Manual_Fase_7.css";

import logo from "../../../assets/imagens/runner/Logo_2.png";
import char1 from "../../../assets/imagens/runner/character1.gif";
import char2 from "../../../assets/imagens/runner/character2.gif";
import char3 from "../../../assets/imagens/runner/character3.gif";
import char4 from "../../../assets/imagens/runner/character4.gif";
import char5 from "../../../assets/imagens/runner/character5.gif";

import star from "../../../assets/imagens/runner/Estrela.png";
import heart from "../../../assets/imagens/runner/Coracao.png";
import rock from "../../../assets/imagens/runner/Pedra.png";
import tree from "../../../assets/imagens/runner/Cogumelo.png";

export default function Manual_Fase_7({ onStart }) {
    return (
        <div className="manual-container">
            <div className="manual-card">
                {/* Logo */}
                <div className="manual-logo">
                    <img src={logo} alt="Logo do jogo" />
                </div>

                <h2>🏁 Manual da Fase 7 – Corrida da Memória</h2>
                <p className="intro">
                    Chegamos à última aventura! Nesta fase, você precisa de <b>agilidade</b> e <b>memória</b> para vencer a Corrida da Memória! ⚡👟
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
                        Escolha seu corredor favorito para desafiar a corrida final e mostrar que sua memória é imbatível! 🧠💨
                    </p>
                </section>

                {/* Controles */}
                <section className="manual-section">
                    <h3>🎮 Controles</h3>
                    <ul>
                        <li>⬆️ <b>Seta para cima</b>: Faz o personagem pular.</li>
                        <li>🖱️ <b>Clique</b>: Inicia a corrida.</li>
                        <li>💡 Dica: fique atento aos símbolos que aparecem no início!</li>
                    </ul>
                </section>

                {/* Objetivo */}
                <section className="manual-section">
                    <h3>🎯 Objetivo</h3>
                    <p>
                        Antes da corrida começar, <b>três símbolos</b> vão aparecer na tela — por exemplo: 🍎 ⭐️ 🌈
                        Durante a corrida, colete apenas esses símbolos corretos para ganhar pontos! ✅
                    </p>
                    <p>
                        Se pegar um símbolo errado... cuidado! ❌ Você perde pontos!
                    </p>
                    <div className="story-demo">
                        <p>💭 Exemplo: Mostrou 🍎⭐️🌈 → Pegue apenas 🍎 e 🌈, fuja dos outros! 🏃‍♂️💨</p>
                    </div>
                </section>

                {/* Itens e Pontuação */}
                <section className="manual-section">
                    <h3>✨ Itens e Pontuação</h3>
                    <div className="items-list">
                        <div className="item">
                            <img src={star} alt="Estrela" />
                            <span>+15 pontos (Símbolo certo 🌟)</span>
                        </div>
                        <div className="item">
                            <img src={heart} alt="Coração" />
                            <span>+20 pontos (Bônus de acerto perfeito 💖)</span>
                        </div>
                        <div className="item">
                            <img src={tree} alt="Cogumelo" />
                            <span>-10 pontos (Símbolo errado 🍄)</span>
                        </div>
                        <div className="item">
                            <img src={rock} alt="Pedra" />
                            <span>-15 pontos (Obstáculo 🪨)</span>
                        </div>
                    </div>
                </section>

                {/* Duração */}
                <section className="manual-section">
                    <h3>⏱️ Tempo</h3>
                    <p>
                        Você terá <b>30 segundos</b> para lembrar dos símbolos certos e coletá-los durante a corrida.
                        Quanto mais rápido e preciso, mais pontos você ganha! ⚡
                    </p>
                </section>

                {/* Dica */}
                <section className="manual-section">
                    <h3>💡 Dica Final</h3>
                    <p>
                        Memorize com atenção os símbolos mostrados no início.
                        Durante a corrida, <b>pegue apenas os corretos</b> e evite os errados!
                        Cada acerto faz sua pontuação subir e o jogo ficar mais empolgante! 🔥🏃‍♀️
                    </p>
                </section>

                {/* Botão */}
                <button className="btn-start" onClick={onStart}>
                    🚀 Começar Corrida da Memória
                </button>
            </div>
        </div>
    );
}
