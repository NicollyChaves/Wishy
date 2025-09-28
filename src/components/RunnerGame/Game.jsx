import { useState } from "react";
import Fase1 from "../RunnerGame/Fases/Fase_1";
import Fase2 from "../RunnerGame/Fases/Fase_2";
import Fase3 from "../RunnerGame/Fases/Fase_3";
import Fase4 from "../RunnerGame/Fases/Fase_4";
import Fase5 from "../RunnerGame/Fases/Fase_5";
import Fase6 from "../RunnerGame/Fases/Fase_6";
import Fase7 from "../RunnerGame/Fases/Fase_7";
import MenuFases from "../RunnerGame/Menu/MenuFases";

export default function Game() {
  const [fase, setFase] = useState(0); // 0 = menu
  const [faseAtual, setFaseAtual] = useState(1); // começa liberando só a fase 1

  function avancarFase() {
    if (fase < 7) {
      setFase(fase + 1);
      setFaseAtual(faseAtual + 1); // libera a próxima fase
    } else {
      setFase(0); // volta pro menu ao terminar
    }
  }

  return (
    <div className="game">
      {fase === 0 && <MenuFases faseAtual={faseAtual} setFase={setFase} />}
      {fase === 1 && <Fase1 onNext={avancarFase} />}
      {fase === 2 && <Fase2 onNext={avancarFase} />}
      {fase === 3 && <Fase3 onNext={avancarFase} />}
      {fase === 4 && <Fase4 onNext={avancarFase} />}
      {fase === 5 && <Fase5 onNext={avancarFase} />}
      {fase === 6 && <Fase6 onNext={avancarFase} />}
      {fase === 7 && <Fase7 onNext={avancarFase} />}
    </div>
  );
}