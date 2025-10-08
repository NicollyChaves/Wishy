// src/components/RunnerGame/Credito.jsx
import React, { useState } from "react";
import "./Creditos.css";

export default function Credito() {
    const [show, setShow] = useState(false);

    return (
        <>
            {/* Botão de Créditos */}
            <button className="btn-creditos" onClick={() => setShow(true)}>
                Créditos
            </button>

            {/* Modal de Créditos */}
            {show && (
                <div className="creditos-overlay" onClick={() => setShow(false)}>
                    <div className="creditos-card" onClick={(e) => e.stopPropagation()}>
                        <h2>🎮 Créditos</h2>
                        <p className="sub">Equipe de Desenvolvimento</p>

                        <div className="creditos-lista">
                            <div className="membro">
                                <h3>Nicolly Chaves</h3>
                                <p>🎨 Designer & Desenvolvimento de Interface</p>
                            </div>
                            <div className="membro">
                                <h3>Erick Chaves</h3>
                                <p>💻 Programação & Lógica do Jogo</p>
                            </div>
                            <div className="membro">
                                <h3>Eliane Santos</h3>
                                <p>🎵 Trilhas Sonoras & Scrum Master</p>
                            </div>
                            <div className="membro">
                                <h3>Andrey Souza</h3>
                                <p>Tester</p>
                            </div>
                        </div>

                        <p className="prof">👨‍🏫 Professor Orientador: João Cruz</p>

                        <button className="btn-fechar" onClick={() => setShow(false)}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
