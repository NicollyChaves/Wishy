import React from "react";
import "./CardPontuacao.css";

export default function CardPontuacao({ score }) {
  return (
    <div className="reward-btn">
      ⭐ Pontos: {score}
    </div>
  );
}
