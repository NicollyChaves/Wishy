// src/components/Duvida.jsx
import React from "react";
import "./Duvida.css";

export default function Duvida({ children, onClose }) {
  return (
    <div className="duvida-overlay">
      <div className="duvida-container">
        <button className="fechar" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}
