// src/components/Feedback/Feedback.jsx
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./Feedback.css";
import characterJump from "../../assets/imagens/runner/Personagem_Comemoracao.gif";

// Importar os áudios
import somParabens from "../../assets/sounds/Feedback/parabens.mp3";
import somEba from "../../assets/sounds/Feedback/eba.mp3";
import somNaoTemProblema from "../../assets/sounds/Feedback/nao_tem_problema.mp3";

const Feedback = ({ pontuacao, onNext }) => {
    const [mensagem, setMensagem] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        let audio = null;

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

        // Reproduz o áudio automaticamente
        if (audio) {
            audio.play().catch((err) => {
                console.warn("Erro ao reproduzir o áudio:", err);
            });
        }

        // Limpeza — pausa o som se o componente for desmontado
        return () => {
            if (audio) {
                audio.pause();
                audio = null;
            }
        };
    }, [pontuacao]);

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

                <button className="btn-proxima-fase" onClick={onNext}>
                    Próxima Fase
                </button>
            </div>

            {/* Personagem comemorando */}
            <img src={characterJump} alt="Personagem" className="character-jump" />
        </div>
    );
};

export default Feedback;
