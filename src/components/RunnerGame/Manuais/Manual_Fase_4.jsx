// src/components/RunnerGame/Manuais/Manual_Fase_4.jsx
import React from "react";
import "./Manual_Fase_4.css";

import logo from "../../../assets/imagens/runner/Logo.png";
import char1 from "../../../assets/imagens/runner/character1.gif";
import char2 from "../../../assets/imagens/runner/character2.gif";
import char3 from "../../../assets/imagens/runner/character3.gif";
import char4 from "../../../assets/imagens/runner/character4.gif";
import char5 from "../../../assets/imagens/runner/character5.gif";

import star from "../../../assets/imagens/runner/Estrela.png";
import heart from "../../../assets/imagens/runner/Coracao.png";
import rock from "../../../assets/imagens/runner/Pedra.png";
import tree from "../../../assets/imagens/runner/Cogumelo.png";


export default function Manual_Fase_4({ onStart }) {
    return (
        <div className="manual-container">
            <div className="manual-card">
                {/* Logo */}
                <div className="manual-logo">
                    <img src={logo} alt="Logo Jogo" />
                </div>

                <h2>📖 Manual da Fase 4</h2>
                <p className="intro">
                    Bem-vindo à <b>Fase 4 — “Cenas do Cotidiano”</b>!
                    Aqui o desafio é descobrir qual palavra combina com a cena mostrada na tela!
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

                {/* Objetivo */}
                <section className="manual-section">
                    <h3>🎯 Objetivo</h3>
                    <p>
                        Uma <b>cena do cotidiano</b> vai aparecer (como “🏫 Ir para a escola”).
                        Corra e pegue a <b>palavra correta</b> que representa a cena!
                    </p>
                </section>

                {/* Exemplos de Cenas */}
                <section className="manual-section">
                    <h3>🖼️ Exemplos de Cenas</h3>
                    <div className="emoji-scenes">
                        <div className="scene">
                            <span className="emoji">🏫</span>
                            <span>Ir para a escola</span>
                        </div>
                        <div className="scene">
                            <span className="emoji">🏠</span>
                            <span>Voltar pra casa</span>
                        </div>
                        <div className="scene">
                            <span className="emoji">🌳</span>
                            <span>Brincar no parque</span>
                        </div>
                        <div className="scene">
                            <span className="emoji">🛒</span>
                            <span>Fazer compras</span>
                        </div>
                    </div>
                </section>

                {/* Mecânica */}
                <section className="manual-section">
                    <h3>⚙️ Como Jogar</h3>
                    <ul>
                        <li>Uma cena aparece no topo da tela.</li>
                        <li>Quatro palavras surgem durante a corrida.</li>
                        <li>Corra e <b>pegue a palavra certa</b> que combina com a cena!</li>
                        <li>✅ Acertou? Ganha pontos e vai pra próxima cena!</li>
                        <li>❌ Errou? Perde alguns pontinhos, mas pode tentar de novo!</li>
                    </ul>
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
                        Você terá <b>90 segundos</b> para acertar o máximo de cenas e palavras possíveis! ⌛
                    </p>
                </section>

                {/* Dica */}
                <section className="manual-section hint-box">
                    <h3>💡 Dica</h3>
                    <p>
                        Fique de olho! Algumas palavras são parecidas 👀
                        Só <b>uma</b> combina direitinho com a cena mostrada!
                    </p>
                </section>

                {/* Botão */}
                <button className="btn-start" onClick={onStart}>
                    🚀 Começar a Fase 4
                </button>
            </div>
        </div>
    );
}
