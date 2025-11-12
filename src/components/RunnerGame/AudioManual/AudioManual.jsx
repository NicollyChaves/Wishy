// src/components/AudioManual.jsx
import React, { useRef } from "react";
import "./AudioManual.css";

export default function AudioManual({ src }) {
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // reinicia se quiser
        }
    };

    return (
        <div>
            <button className="botao-audio" onClick={handlePlayPause}>
                🔊
            </button>
            <audio ref={audioRef} src={src} />
        </div>
    );
}
