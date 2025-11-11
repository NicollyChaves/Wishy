// src/components/RunnerGame/Manuais/Manual_Fase_5.jsx
import React from "react";
import "./Manual_Fase_5.css";

import logo from "../../../assets/imagens/runner/Logo.png";
import char1 from "../../../assets/imagens/runner/character1.gif";
import char2 from "../../../assets/imagens/runner/character2.gif";
import char3 from "../../../assets/imagens/runner/character3.gif";
import char4 from "../../../assets/imagens/runner/character4.gif";
import char5 from "../../../assets/imagens/runner/character5.gif";

export default function Manual_Fase_5({ onStart }) {
    return (
        <div className="manual-container">
            <div className="manual-card">
                {/* Logo */}
                <div className="manual-logo">
                    <img src={logo} alt="Logo Jogo" />
                </div>

                <h2>📖 Manual da Fase 5</h2>
                <p className="intro">
                    Nesta fase divertida, você vai ouvir frases curtinhas e formar elas pegando as palavras certas na ordem correta! 🎧✨
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
                    <p>Selecione seu herói favorito para ouvir, pensar e montar frases divertidas!</p>
                </section>

                {/* Como Jogar */}
                <section className="manual-section">
                    <h3>🎮 Como Jogar</h3>
                    <ul>
                        <li>🎧 Ouça com atenção a frase que será dita.</li>
                        <li>🏃‍♀️ Corra e pegue as palavras certas que formam essa frase!</li>
                        <li>🚫 Se pegar uma palavra errada, perde pontos.</li>
                        <li>✅ Se acertar todas na ordem certa, ouve a frase completa e ganha bônus!</li>
                    </ul>
                </section>

                {/* Exemplos */}
                <section className="manual-section">
                    <h3>🗣️ Exemplos de Frases</h3>
                    <div className="examples">
                        <p>“O gato correu.” 🐱🏃‍♂️</p>
                        <p>“A bola é azul.” ⚽💙</p>
                        <p>“A foca nada.” 🦭💦</p>
                        <p>“O galo canta.” 🐓🎶</p>
                    </div>
                </section>

                {/* Reforço Auditivo */}
                <section className="manual-section">
                    <h3>🔊 Reforço Auditivo</h3>
                    <p>
                        Cada frase é acompanhada de um áudio com voz suave e amigável 💬.
                        Isso ajuda a criança a associar a escrita com o som, fortalecendo a alfabetização auditiva e visual! 🌟
                    </p>
                    <div className="audio-demo">
                        <span>🎧 “O gato correu.”</span>
                        <button className="btn-audio">▶️ Ouvir exemplo</button>
                    </div>
                </section>

                {/* Pontuação */}
                <section className="manual-section">
                    <h3>🏅 Pontuação</h3>
                    <ul>
                        <li>✅ Palavra correta: <b>+10 pontos</b></li>
                        <li>❌ Palavra errada: <b>-5 pontos</b></li>
                        <li>🎉 Frase completa e correta: <b>Bônus +20 pontos</b></li>
                    </ul>
                </section>

                {/* Tempo */}
                <section className="manual-section">
                    <h3>⏱️ Tempo</h3>
                    <p>
                        Você terá <b>30 segundos</b> para montar o maior número de frases possível!
                        Preste atenção e ouça com cuidado 💕
                    </p>
                </section>

                {/* Botão de início */}
                <button className="btn-start" onClick={onStart}>
                    🚀 Começar a Fase 5
                </button>
            </div>
        </div>
    );
}
