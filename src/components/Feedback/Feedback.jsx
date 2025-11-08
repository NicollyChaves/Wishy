// src/components/Feedback/Feedback.jsx
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./Feedback.css";
import characterJump from "../../assets/imagens/runner/Personagem_Comemoracao.gif";

import somParabens from "../../assets/sounds/Feedback/parabens.mp3";
import somEba from "../../assets/sounds/Feedback/eba.mp3";
import somNaoTemProblema from "../../assets/sounds/Feedback/nao_tem_problema.mp3";

const Feedback = ({ pontuacao, onNext, idJogador, fase }) => {
    console.groupCollapsed("📘 Feedback Debug Info");
    console.log("🧩 ID do jogador:", idJogador);
    console.log("🧩 Fase recebida:", fase);
    console.log("🧩 Pontuação recebida:", pontuacao);
    console.groupEnd();

    const [mensagem, setMensagem] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);

    // 🔹 Envia pontuação ao backend
    useEffect(() => {
        async function enviarPontuacao() {
            if (!idJogador || fase == null) {
                console.warn("⚠️ ID do jogador ou fase não definido. Envio de pontuação cancelado.");
                return;
            }

            const campo = `fase_${fase.replace("fase_", "")}`; // garante o formato fase_1, fase_2 etc
            const valor = pontuacao;

            try {
                console.log("🚀 Enviando pontuação para backend:", { id_jogador: idJogador, campo, valor });

                const response = await fetch("http://localhost:5000/api/jogadores/pontuacao", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_jogador: idJogador, campo, valor }),
                });

                if (!response.ok) throw new Error(`Erro ao salvar pontuação: ${response.status}`);

                console.log(`✅ Pontuação da ${campo} salva com sucesso!`);
            } catch (error) {
                console.error("❌ Erro ao enviar pontuação:", error);
            }
        }

        enviarPontuacao();
    }, [idJogador, pontuacao, fase]);

    // 🔹 Mostra mensagens e áudio conforme a pontuação
    useEffect(() => {
        let audio = null;

        console.log("🎯 Avaliando pontuação:", pontuacao);

        if (pontuacao > 500) {
            setMensagem("🎉 Parabéns!! Você mandou muito bem!");
            setShowConfetti(true);
            audio = new Audio(somParabens);
        } else if (pontuacao >= 300) {
            setMensagem("👏 Eba!! Você foi muito bem!");
            setShowConfetti(true);
            audio = new Audio(somEba);
        } else {
            setMensagem("🍀 Não tem problema! Cada erro é um aprendizado.");
            setShowConfetti(true);
            audio = new Audio(somNaoTemProblema);
        }

        audio?.play().catch((err) => {
            console.warn("🔇 Falha ao reproduzir áudio:", err);
        });

        return () => {
            audio?.pause();
            audio = null;
        };
    }, [pontuacao]);

    const handleNextPhase = () => {
        console.log("➡️ Botão 'Próxima Fase' clicado!");
        try {
            onNext?.();
        } catch (err) {
            console.error("❌ Erro ao tentar avançar para próxima fase:", err);
        }
    };

    return (
        <div className="feedback-container">
            <div className="feedback-card">
                {showConfetti && (
                    <div className="confetti-wrapper">
                        <Confetti numberOfPieces={150} recycle={false} gravity={0.3} />
                    </div>
                )}

                <h2 className="feedback-text">{mensagem}</h2>
                <p className="pontuacao">Sua pontuação: {pontuacao}</p>

                <button className="btn-proxima-fase" onClick={() => {
                    console.log("➡️ Próxima fase clicada! Pontos da fase:", pontuacao);
                    if (onNext) {
                        onNext(pontuacao); // 👈 agora envia a pontuação para Game.jsx
                    } else {
                        console.warn("⚠️ Nenhuma função onNext() foi passada para o Feedback!");
                    }
                }}>
                    Próxima Fase
                </button>
            </div>

            <img src={characterJump} alt="Personagem comemorando" className="character-jump" />
        </div>
    );
};

export default Feedback;
