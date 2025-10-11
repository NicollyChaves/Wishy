// src/components/Feedback/Feedback.jsx
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./Feedback.css";
import characterJump from "../../assets/imagens/runner/Personagem_Comemoracao.gif";

const Feedback = ({ pontuacao, onNext }) => {
    const [mensagem, setMensagem] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (pontuacao > 500) {
            setMensagem("🎉 Parabéns!! Você mandou muito bem!");
            setShowConfetti(true);
        } else if (pontuacao >= 300) {
            setMensagem("👏 Eba!! Você foi muito bem!");
            setShowConfetti(true);
        } else {
            setMensagem("🍀 Não tem problema! Cada erro é um aprendizado.");
            setShowConfetti(true);
        }
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

            {/* Personagem pulando */}
            <img src={characterJump} alt="Personagem" className="character-jump" />
        </div>
    );
};

export default Feedback;
