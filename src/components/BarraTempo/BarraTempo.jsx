import React from "react";
import "./BarraTempo.css";

export default function BarraTempo({ timeLeft, maxTime = 90 }) {
  const percent = (timeLeft / maxTime) * 100;

  return (
    <div className="time-bar">
      <div className="time-fill" style={{ height: `${percent}%` }} />
    </div>
  );
}
