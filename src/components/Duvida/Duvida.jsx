// src/components/Duvida.jsx
import React, { useState } from "react";
import "./Duvida.css";

export default function Duvida({ children }) {
    const [aberto, setAberto] = useState(false);

    // alterna entre abrir e fechar o manual
    const toggleManual = () => {
        setAberto(!aberto);
    };

    return (
        <>
            {/* Botão de dúvida */}
            <button className="botao-duvida" onClick={toggleManual}>
                ?
            </button>

            {/* Manual da fase */}
            {aberto && (
                <div className="duvida-overlay">
                    <div className="duvida-container">
                        <button className="fechar" onClick={toggleManual}>X</button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
