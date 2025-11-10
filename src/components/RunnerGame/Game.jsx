// Game.jsx
import { useState } from "react";
import Fase1 from "../RunnerGame/Fases/Fase_1";
import Fase2 from "../RunnerGame/Fases/Fase_2";
import Fase3 from "../RunnerGame/Fases/Fase_3";
import Fase4 from "../RunnerGame/Fases/Fase_4";
import Fase5 from "../RunnerGame/Fases/Fase_5";
import Fase6 from "../RunnerGame/Fases/Fase_6";
import Fase7 from "../RunnerGame/Fases/Fase_7";
import FaseOculta from "../RunnerGame/Fases/Fase_Oculta";

import MenuFases from "../RunnerGame/Menu/MenuFases";

import ManualFase1 from "../RunnerGame/Manuais/Manual_Fase_1";
import ManualFase2 from "../RunnerGame/Manuais/Manual_Fase_2";
import ManualFase3 from "../RunnerGame/Manuais/Manual_Fase_3";
import ManualFase4 from "../RunnerGame/Manuais/Manual_Fase_4";
import ManualFase5 from "../RunnerGame/Manuais/Manual_Fase_5";
import ManualFase6 from "../RunnerGame/Manuais/Manual_Fase_6";
import ManualFase7 from "../RunnerGame/Manuais/Manual_Fase_7";
import ManualFaseOculta from "../RunnerGame/Manuais/Manual_Fase_Oculta";

export default function Game() {
  const [fase, setFase] = useState(0); // 0 = menu
  const [faseAtual, setFaseAtual] = useState(1);
  const [mostrarManual, setMostrarManual] = useState(true);
  const [nome, setNome] = useState("");
  const [nomeConfirmado, setNomeConfirmado] = useState(false);
  const [pontuacaoTotal, setPontuacaoTotal] = useState(0);
  const [idJogador, setJogadorId] = useState(null);

  // 🧩 Função chamada ao finalizar uma fase
  function avancarFase(pontosDaFase = 0) {
    console.log("🎯 Avançando de fase... pontos recebidos:", pontosDaFase);
    const novaPontuacao = pontuacaoTotal + pontosDaFase;
    setPontuacaoTotal(novaPontuacao);
    console.log("🏆 Pontuação total atualizada:", novaPontuacao);

    if (fase === 7) {
      console.log("🌀 Fase 7 concluída! Verificando desbloqueio da Fase Oculta...");

      // ✅ Só libera se a fase 7 foi concluída (não apenas pontuação)
      setTimeout(() => {
        console.log("✨ Fase Oculta desbloqueada! Indo para a Fase 8...");
        setFase(8); // vai para a fase oculta
        setMostrarManual(true);
      }, 1500);
      
      return;
    }

    if (fase < 7) {
      setFaseAtual((prev) => Math.min(prev + 1, 7));
      setFase(0);
      setMostrarManual(true);
    } else {
      setFase(0);
    }
  }


  return (
    <div className="game">
      {/* 🏠 Menu principal */}
      {fase === 0 && (
        <MenuFases
          faseAtual={faseAtual}
          setFase={setFase}
          nome={nome}
          setNome={setNome}
          nomeConfirmado={nomeConfirmado}
          setNomeConfirmado={setNomeConfirmado}
          setJogadorId={setJogadorId}
          pontuacaoTotal={pontuacaoTotal} // 👈 envia pontuação total para o menu
        />
      )}

      {/* 🌈 Fase 1 */}
      {fase === 1 &&
        (mostrarManual ? (
          <ManualFase1 onStart={() => setMostrarManual(false)} />
        ) : (
          <Fase1 onNext={avancarFase} idJogador={idJogador} />
        ))}

      {/* 🌳 Fase 2 */}
      {fase === 2 &&
        (mostrarManual ? (
          <ManualFase2 onStart={() => setMostrarManual(false)} />
        ) : (
          <Fase2 onNext={avancarFase} idJogador={idJogador} />
        ))}

      {/* 🌻 Fase 3 */}
      {fase === 3 &&
        (mostrarManual ? (
          <ManualFase3 onStart={() => setMostrarManual(false)} />
        ) : (
          <Fase3 onNext={avancarFase} idJogador={idJogador} />
        ))}

      {/* 🌎 Fase 4 */}
      {fase === 4 &&
        (mostrarManual ? (
          <ManualFase4 onStart={() => setMostrarManual(false)} />
        ) : (
          <Fase4 onNext={avancarFase} idJogador={idJogador} />
        ))}

      {/* 🌊 Fase 5 */}
      {fase === 5 &&
        (mostrarManual ? (
          <ManualFase5 onStart={() => setMostrarManual(false)} />
        ) : (
          <Fase5 onNext={avancarFase} idJogador={idJogador} />
        ))}

      {/* 🌋 Fase 6 */}
      {fase === 6 &&
        (mostrarManual ? (
          <ManualFase6 onStart={() => setMostrarManual(false)} />
        ) : (
          <Fase6 onNext={avancarFase} idJogador={idJogador} />
        ))}

      {/* 🌟 Fase 7 */}
      {fase === 7 &&
        (mostrarManual ? (
          <ManualFase7 onStart={() => setMostrarManual(false)} />
        ) : (
          <Fase7 onNext={avancarFase} idJogador={idJogador} />
        ))}

      {/* 🔥 Fase Oculta */}
      {fase === 8 &&
        (mostrarManual ? (
          <ManualFaseOculta onStart={() => setMostrarManual(false)} />
        ) : (
          <FaseOculta onNext={avancarFase} idJogador={idJogador} />
        ))}
    </div>
  );
}
