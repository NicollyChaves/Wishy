// src/components/RunnerGame/Manuais/Manual_Fase_3.jsx
import React from "react";
import "./Manual_Fase_3.css";

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

import AudioManual from "../AudioManual/AudioManual";
import manualFase3 from "../../../assets/sounds/Manuais/Manual_fase_3.mp3";

export default function Manual_Fase_3({ onStart }) {
    return (
        <div className="manual-container">
            <div className="manual-card">
                {/* Logo */}
                <div className="manual-logo">
                    <img src={logo} alt="Logo Jogo" />
                </div>

                {/* Botão para ouvir o manual */}
                <AudioManual src={manualFase3} />

                <h2>📖 Manual da Fase 3</h2>
                <p className="intro">
                    Bem-vindo à terceira fase! Agora é hora de testar seus ouvidos e sua memória.
                    Em vez de imagens, você ouvirá sons e precisará identificar a <b>primeira letra</b> da palavra ouvida!
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
                        Ouça o som e identifique a primeira letra da palavra falada. Pule para coletar a letra correta e marque pontos!
                    </p>
                </section>

                {/* Novo bloco - Desafio Sonoro */}
                <section className="manual-section">
                    <h3>🎧 Desafio Sonoro</h3>
                    <div className="sound-challenge">
                        <div className="sound-icon">🔊</div>
                        <div className="letters">
                            <span className="option correct">B ✅</span>
                            <span className="option wrong">F ❌</span>
                            <span className="option wrong">L ❌</span>
                        </div>
                    </div>
                </section>

                {/* Itens */}
                <section className="manual-section">
                    <h3>✨ Itens e Pontuação</h3>
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

                {/* Pontuação por acerto/erro */}
                <section className="manual-section">
                    <h3>💡 Regras de Pontuação</h3>
                    <ul className="score-rules">
                        <li>✅ Letra correta: <b>+10 pontos</b></li>
                        <li>❌ Letra errada: <b>-5 pontos</b></li>
                    </ul>
                </section>

                {/* Duração */}
                <section className="manual-section">
                    <h3>⏱️ Tempo</h3>
                    <p>
                        Você terá <b>30 segundos</b> para ouvir os sons e acertar o máximo de letras possível!
                    </p>
                </section>

                {/* Botão */}
                <button className="btn-start" onClick={onStart}>
                    🚀 Começar a Fase 3
                </button>
            </div>
        </div>
    );
}
