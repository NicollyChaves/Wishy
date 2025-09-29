import { useState } from "react";
import Fase1 from "../RunnerGame/Fases/Fase_1";
import Fase2 from "../RunnerGame/Fases/Fase_2";
import Fase3 from "../RunnerGame/Fases/Fase_3";
import Fase4 from "../RunnerGame/Fases/Fase_4";
import Fase5 from "../RunnerGame/Fases/Fase_5";
import Fase6 from "../RunnerGame/Fases/Fase_6";
import Fase7 from "../RunnerGame/Fases/Fase_7";
import MenuFases from "../RunnerGame/Menu/MenuFases";

// importar o manual da fase 1
import ManualFase1 from "../RunnerGame/Manuais/Manual_Fase_1";

export default function Game() {
  const [fase, setFase] = useState(0); // 0 = menu
  const [faseAtual, setFaseAtual] = useState(1); // começa liberando só a fase 1
  const [mostrarManual, setMostrarManual] = useState(true); // mostra manual ao iniciar fase 1
  const [nome, setNome] = useState(""); // nome do jogador
  const [nomeConfirmado, setNomeConfirmado] = useState(false); // confirma nome

  function avancarFase() {
    if (fase < 7) {
      setFaseAtual((prev) => Math.min(prev + 1, 7)); // libera a próxima fase
      setFase(0); // volta para o menu
      setMostrarManual(true); // garante que o manual apareça de novo se for outra fase
    } else {
      setFase(0); // terminou tudo, volta pro menu
    }
  }

  return (
    <div className="game">
      {fase === 0 && (
        <MenuFases
          faseAtual={faseAtual}
          setFase={setFase}
          nome={nome}
          setNome={setNome}
          nomeConfirmado={nomeConfirmado}
          setNomeConfirmado={setNomeConfirmado}
        />
      )}

      {/* Fase 1 com manual */}
      {fase === 1 &&
        (mostrarManual ? (
          <ManualFase1 onStart={() => setMostrarManual(false)} />
        ) : (
          <Fase1 onNext={avancarFase} />
        ))}

      {fase === 2 && <Fase2 onNext={avancarFase} />}
      {fase === 3 && <Fase3 onNext={avancarFase} />}
      {fase === 4 && <Fase4 onNext={avancarFase} />}
      {fase === 5 && <Fase5 onNext={avancarFase} />}
      {fase === 6 && <Fase6 onNext={avancarFase} />}
      {fase === 7 && <Fase7 onNext={avancarFase} />}
    </div>
  );
}
