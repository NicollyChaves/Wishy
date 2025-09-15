// components/AvatarPicker.jsx
import React from 'react';
export default function AvatarPicker({ onClose, onPick }){
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={(e)=>e.stopPropagation()}>
        <h3>Escolher Mascote</h3>
        <div className="avatar-grid">
          <img src="/assets/avatar1.png" alt="a1" onClick={() => onPick('a1')} />
          <img src="/assets/avatar2.png" alt="a2" onClick={() => onPick('a2')} />
          <img src="/assets/avatar3.png" alt="a3" onClick={() => onPick('a3')} />
        </div>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
