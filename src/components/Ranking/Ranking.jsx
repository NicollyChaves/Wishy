// src/pages/Ranking.jsx
import React, { useEffect, useState } from "react";
import "./Ranking.css";

const Ranking = () => {
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        // 🔹 Aqui futuramente você vai substituir pela rota do seu back-end:
        // Exemplo: fetch("http://localhost:5000/api/ranking")
        // Por enquanto, simulação de dados:
        const rankingExemplo = [
            { id: 1, nome: "Maria Estrelinha", pontuacao_total: 980 },
            { id: 2, nome: "João Saltitante", pontuacao_total: 940 },
            { id: 3, nome: "Ana Corajosa", pontuacao_total: 900 },
            { id: 4, nome: "Pedro Veloz", pontuacao_total: 870 },
            { id: 5, nome: "Lia Saltadora", pontuacao_total: 800 },
        ];
        setJogadores(rankingExemplo);
    }, []);

    return (
        <div className="ranking-container">
            <h1 className="ranking-title">🏆 Ranking dos Melhores Jogadores</h1>

            <div className="ranking-list">
                {jogadores.map((jogador, index) => (
                    <div
                        key={jogador.id}
                        className={`ranking-card posicao-${index + 1}`}
                    >
                        <div className="ranking-posicao">#{index + 1}</div>
                        <div className="ranking-info">
                            <h2 className="ranking-nome">{jogador.nome}</h2>
                            <p className="ranking-pontuacao">{jogador.pontuacao_total} pontos</p>
                        </div>
                        {index === 0 && (
                            <img
                                src="../../../assets/imagens/runner/character1.gif"
                                alt="Campeão"
                                className="ranking-img"
                            />
                        )}
                        {index === 1 && (
                            <img
                                src="../../../assets/imagens/runner/character1.gif"
                                alt="Vice-campeão"
                                className="ranking-img"
                            />
                        )}
                        {index === 2 && (
                            <img
                                src="../../../assets/imagens/runner/character1.gif"
                                alt="Terceiro lugar"
                                className="ranking-img"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ranking;
