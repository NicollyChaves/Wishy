// src/pages/Ranking.jsx
import React, { useEffect, useState } from "react";
import "./Ranking.css";
import char1 from "../../assets/imagens/runner/character1.gif";
import char2 from "../../assets/imagens/runner/character2.gif";
import char3 from "../../assets/imagens/runner/character3.gif";

const Ranking = ({ onClose }) => {
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        async function fetchRanking() {
            try {
                console.log("📡 Buscando ranking no servidor...");
                const response = await fetch("http://localhost:5000/api/ranking");
                console.log("🔎 Status da resposta:", response.status);

                if (!response.ok) throw new Error("Erro ao carregar ranking");
                const data = await response.json();

                console.log("🏆 Ranking carregado com sucesso:", data);
                setJogadores(data);
            } catch (err) {
                console.error("💥 Erro ao buscar ranking:", err);
            }
        }

        fetchRanking();
    }, []);


    return (
        <div className="ranking-container">
            <h1 className="ranking-title">🏆 Top 10 Jogadores</h1>

            <div className="ranking-list">
                {jogadores.length > 0 ? (
                    jogadores.map((jogador, index) => (
                        <div
                            key={jogador.id_jogador}
                            className={`ranking-card posicao-${index + 1}`}
                        >
                            <div className="ranking-posicao">#{index + 1}</div>
                            <div className="ranking-info">
                                <h2 className="ranking-nome">{jogador.nome}</h2>
                                <p className="ranking-pontuacao">{jogador.pontuacao_total} pontos</p>
                            </div>
                            {index === 0 && <img src={char1} alt="Campeão" className="ranking-img" />}
                            {index === 1 && <img src={char2} alt="Vice" className="ranking-img" />}
                            {index === 2 && <img src={char3} alt="Terceiro" className="ranking-img" />}
                        </div>
                    ))
                ) : (
                    <p className="ranking-loading">Carregando ranking...</p>
                )}
            </div>

            {onClose && (
                <button className="btn-voltar" onClick={onClose}>
                    ⬅ Voltar
                </button>
            )}
        </div>
    );
};

export default Ranking;
