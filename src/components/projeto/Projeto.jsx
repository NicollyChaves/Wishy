import React from 'react';
import './Projeto.css';
import Projeto_a from '../../assets/imagens/Banner.png';
import Projeto_b from '../../assets/imagens/Projeto_2.png';
import Projeto_c from '../../assets/imagens/Projeto_3.png';
import Projeto_d from '../../assets/imagens/Projeto_4.png';



function projeto() {
  return (
    <div className='projeto'>
      <div className="galeria">

        <img src={Projeto_a} alt="" onClick={() => window.open("https://github.com/NicollyChaves/Cyber_Point_TDD", "_blank")} />
        <img src={Projeto_b} alt="" onClick={() => window.open("https://github.com/NicollyChaves/Cyber_Point_TDD", "_blank")} />
        <img src={Projeto_c} alt="" onClick={() => window.open("https://github.com/NicollyChaves/Cyber_Point_TDD", "_blank")} />
        <img src={Projeto_d} alt="" onClick={() => window.open("https://nicollychaves.github.io/Zync/index.html#", "_blank")} />

      </div>

    </div>
  )
}

export default projeto;
