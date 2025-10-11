import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./Recompensa.css";

import medalhaOuro from "../../assets/imagens/runner/Medalha_Ouro.png";
import medalhaPrata from "../../assets/imagens/runner/Medalha_Ouro.png";
import medalhaBronze from "../../assets/imagens/runner/Medalha_Ouro.png";

const Recompensa = ({ pontuacao, onRecompensaFinalizada }) => {
    const [recompensa, setRecompensa] = useState(null);
    const [mostrarConfete, setMostrarConfete] = useState(false);

    useEffect(() => {
        if (pontuacao >= 80) {
            setRecompensa({
                tipo: "ouro",
                imagem: medalhaOuro,
                mensagem: "🏆 Incrível! Você conquistou a Medalha de Ouro!",
            });
        } else if (pontuacao >= 60) {
            setRecompensa({
                tipo: "prata",
                imagem: medalhaPrata,
                mensagem: "🥈 Muito bem! Você ganhou a Medalha de Prata!",
            });
        } else {
            setRecompensa({
                tipo: "bronze",
                imagem: medalhaBronze,
                mensagem: "🥉 Boa! Você ganhou a Medalha de Bronze!",
            });
        }

        // Mostra confete por 3 segundos e depois chama o feedback
        setMostrarConfete(true);
        const timer = setTimeout(() => {
            setMostrarConfete(false);
            if (onRecompensaFinalizada) onRecompensaFinalizada();
        }, 4000);

        return () => clearTimeout(timer);
    }, [pontuacao, onRecompensaFinalizada]);

    if (!recompensa) return null;

    return (
        <div className="recompensa-container">
            {mostrarConfete && <Confetti />}
            <div className={`recompensa-card ${recompensa.tipo}`}>
                <img
                    src={recompensa.imagem}
                    alt={`Medalha de ${recompensa.tipo}`}
                    className="recompensa-imagem"
                />
                <p className="recompensa-mensagem">{recompensa.mensagem}</p>
            </div>
        </div>
    );
};

export default Recompensa;
