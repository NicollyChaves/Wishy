// src/components/MenuFases.jsx
import React, { useState } from "react";
import "./MenuFases.css";

export default function MenuFases({
    faseAtual,
    setFase,
    nome,
    setNome,
    nomeConfirmado,
    setNomeConfirmado,
}) {
    const [jogadorId, setJogadorId] = useState(null); // ID retornado do backend
    const [carregando, setCarregando] = useState(false);

    const fases = [
        { id: 1, top: "85%", left: "70%" },
        { id: 2, top: "85%", left: "45%" },
        { id: 3, top: "75%", left: "65%" },
        { id: 4, top: "70%", left: "50%" },
        { id: 5, top: "60%", left: "58%" },
        { id: 6, top: "60%", left: "68%" },
        { id: 7, top: "45%", left: "65%" },
    ];

    // Função para registrar o jogador no backend
    async function registrarJogador(nome) {
        try {
            setCarregando(true);
            const response = await fetch("http://localhost:5000/api/jogadores/registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome }),
            });

            if (!response.ok) {
                throw new Error("Erro ao registrar jogador");
            }

            const data = await response.json();
            setJogadorId(data.id_jogador);
            console.log("Jogador cadastrado com sucesso! ID:", data.id_jogador);
            setCarregando(false);
        } catch (error) {
            console.error("Erro ao cadastrar jogador:", error);
            alert("Ocorreu um erro ao registrar o jogador. Tente novamente.");
            setCarregando(false);
        }
    }

    // Quando o jogador confirma o nome
    const handleConfirmarNome = async () => {
        if (nome.trim() !== "") {
            await registrarJogador(nome); // chama o backend
            setNomeConfirmado(true);
        } else {
            alert("Por favor, digite seu nome para continuar!");
        }
    };

    return (
        <div className="menu-fases">
            <h1 className="titulo-mapa">Mapa das Fases</h1>

            {!nomeConfirmado && (
                <div className="card-nome">
                    <h2>Digite seu nome para jogar</h2>
                    <input
                        type="text"
                        placeholder="Seu nome..."
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        disabled={carregando}
                    />
                    <button
                        className="btn-confirmar"
                        onClick={handleConfirmarNome}
                        disabled={carregando}
                    >
                        {carregando ? "Registrando..." : "Confirmar"}
                    </button>
                </div>
            )}

            {nomeConfirmado && (
                <div className="mapa">
                    {fases.map((fase) => {
                        const bloqueada = fase.id > faseAtual;
                        return (
                            <button
                                key={fase.id}
                                className={`fase-botao ${bloqueada ? "bloqueada" : ""}`}
                                style={{ top: fase.top, left: fase.left }}
                                onClick={() => !bloqueada && setFase(fase.id)}
                            >
                                {bloqueada ? "🔒" : fase.id}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
