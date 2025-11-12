// src/components/RunnerGame/Manuais/Manual_Fase_Oculta.jsx
import React from "react";
import "./Manual_Fase_Oculta.css";

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
import manualFaseOculta from "../../../assets/sounds/Manuais/Manual_fase_oculta.mp3";

export default function Manual_Fase_Oculta({ onStart }) {
    return (<div className="manual-container"> <div className="manual-card">
        {/* Logo */} <div className="manual-logo"> <img src={logo} alt="Logo Jogo" /> </div>

        {/* Botão para ouvir o manual */}
        <AudioManual src={manualFaseOculta} />

        <h2>🪄 Manual da Fase Oculta - Floresta Encantada</h2>
        <p className="intro">
            Parabéns, aventureiro! 🌟 Você chegou à misteriosa <b>Floresta Encantada</b>,
            um lugar cheio de magia, criaturas místicas e segredos escondidos.
            Use tudo o que aprendeu até aqui para conquistar a fase final!
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
            <p>Escolha seu herói favorito para embarcar nessa aventura mágica!</p>
        </section>

        {/* Controles */}
        <section className="manual-section">
            <h3>🎮 Controles</h3>
            <ul>
                <li>⬆️ <b>Seta para cima</b>: Pule para desviar de feitiços e obstáculos.</li>
                <li>🖱️ <b>Clique</b>: Inicia a fase.</li>
            </ul>
        </section>

        {/* Objetivo */}
        <section className="manual-section">
            <h3>🎯 Objetivo</h3>
            <p>
                Corra pela floresta encantada, colete <b>estrelas mágicas</b> e <b>corações brilhantes</b>
                para ganhar pontos! 🌟❤️<br />
                Cuidado com os <b>cogumelos venenosos</b> e as <b>pedras encantadas</b> —
                elas tiram pontos e podem diminuir sua energia!
            </p>
        </section>

        {/* Mágica da Floresta */}
        <section className="manual-section">
            <h3>🧙‍♂️ Mágica da Floresta</h3>
            <p>
                De tempos em tempos, um feitiço misterioso surgirá na floresta...
                Se você <b>pular no momento certo</b>, ele se transformará em pontos extras! ✨
            </p>
        </section>

        {/* Itens */}
        <section className="manual-section">
            <h3>✨ Itens da Floresta</h3>
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
                    <img src={star} alt="Estrela Mágica" />
                    <span>+20 pontos</span>
                </div>
                <div className="item">
                    <img src={heart} alt="Coração Encantado" />
                    <span>+25 pontos</span>
                </div>
            </div>
        </section>

        {/* Tempo */}
        <section className="manual-section">
            <h3>⏱️ Tempo</h3>
            <p>
                Você terá <b>30 segundos</b> para conquistar o maior número de pontos possível.
                Dê o seu melhor e mostre que é um verdadeiro guardião da floresta! 🌳✨
            </p>
        </section>

        {/* Botão */}
        <button className="btn-start" onClick={onStart}>
            🌟 Começar a Fase Oculta
        </button>
    </div>
    </div>
    );

}
