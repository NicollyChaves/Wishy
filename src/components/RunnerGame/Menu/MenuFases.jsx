import React from "react";
import "./MenuFases.css";

export default function MenuFases({
    faseAtual,
    setFase,
    nome,
    setNome,
    nomeConfirmado,
    setNomeConfirmado,
}) {
    const fases = [
        { id: 1, top: "85%", left: "70%" },
        { id: 2, top: "85%", left: "45%" },
        { id: 3, top: "75%", left: "65%" },
        { id: 4, top: "70%", left: "50%" },
        { id: 5, top: "60%", left: "58%" },
        { id: 6, top: "60%", left: "68%" },
        { id: 7, top: "45%", left: "65%" },
    ];

    const handleConfirmarNome = () => {
        if (nome.trim() !== "") {
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
                    />
                    <button className="btn-confirmar" onClick={handleConfirmarNome}>
                        Confirmar
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
