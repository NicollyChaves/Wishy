// src/components/RunnerGame/Ranking.jsx
import React, { useState, useEffect } from "react";
import "./Ranking.css";

export default function Ranking() {
    const [show, setShow] = useState(false);
    const [ranking, setRanking] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    // Função que busca o Top 10 jogadores do backend
    const carregarRanking = async () => {
        setCarregando(true);
        setErro("");

        try {
            const resposta = await fetch("http://localhost:5000/api/jogadores/ranking");
            if (!resposta.ok) {
                throw new Error("Erro ao carregar o ranking do servidor.");
            }

            const dados = await resposta.json();
            setRanking(dados);
        } catch (erro) {
            console.error("💥 Erro ao buscar ranking:", erro);
            setErro("Erro ao carregar o ranking. Tente novamente mais tarde.");
        } finally {
            setCarregando(false);
        }
    };

    // Busca os dados apenas quando o modal for aberto
    useEffect(() => {
        if (show) {
            carregarRanking();
        }
    }, [show]);

    return (
        <>
            {/* Botão de Ranking */}
            <button className="btn-ranking" onClick={() => setShow(true)}>
                Ranking
            </button>

            {/* Modal de Ranking */}
            {show && (
                <div className="ranking-overlay" onClick={() => setShow(false)}>
                    <div className="ranking-card" onClick={(e) => e.stopPropagation()}>
                        <h2>🏆 Top 10 Jogadores</h2>
                        <p className="sub">As melhores pontuações do jogo</p>

                        <div className="ranking-lista">
                            {carregando && <p className="sem-dados">Carregando ranking...</p>}

                            {erro && <p className="erro">{erro}</p>}

                            {!carregando && !erro && ranking.length === 0 && (
                                <p className="sem-dados">Nenhum jogador cadastrado ainda.</p>
                            )}

                            {!carregando &&
                                !erro &&
                                ranking.length > 0 &&
                                ranking.map((jogador, i) => (
                                    <div
                                        key={jogador.id_jogador || i}
                                        className={`ranking-item ${i === 0 ? "top1" : ""}`}
                                    >
                                        <span className="posicao">#{i + 1}</span>
                                        <span className="nome">{jogador.nome}</span>
                                        <span className="pontos">{jogador.pontuacao_total} pts</span>
                                    </div>
                                ))}
                        </div>

                        <button className="btn-fechar" onClick={() => setShow(false)}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
