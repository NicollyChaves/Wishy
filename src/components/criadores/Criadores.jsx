import React, { useRef } from 'react';
import './Criadores.css';
import { ArrowLeft, ArrowRight } from "lucide-react";
import Foto_a from '../../assets/imagens/Andrei.jpg';
import Foto_b from '../../assets/imagens/Eliane.jpg';
import Foto_c from '../../assets/imagens/Erick.png';
import Foto_d from '../../assets/imagens/Nicolly.png';


function Criadores() {

  const cards = useRef();
  let tx = 0;

  const cardForward = () => {
    if(tx > -50){
      tx -= 25;
    }
    cards.current.style.transform = `translateX(${tx}%)`;
  }

  const cardBackward = () => {
    if(tx < 0){
      tx += 25;
    }
    cards.current.style.transform = `translateX(${tx}%)`;
  }

  return (
    <div className='criadores'>

      <button className="btn-criadores next-btn" onClick={cardBackward}>
        <ArrowLeft size={20} />
      </button>

      <div className='cards'>

        <ul ref={cards}>
          
          <li>
            <div className='card'>
              <div className="user-info">
                <img src={Foto_a} alt="" />
                <div>
                  <h3>Andrey Souza</h3>
                  <span>38805481</span>
                </div>
              </div>
              <p>É alguém que se destaca pelo pensamento crítico, responsabilidade e adaptabilidade, mostrando flexibilidade diante de diferentes desafios. Suas soft skills demonstram uma postura analítica e comprometida, essenciais para atuar em ambientes dinâmicos e tecnológicos.</p>
            </div>
          </li>

          <li>
            <div className='card'>
              <div className="user-info">
                <img src={Foto_b} alt="" />
                <div>
                  <h3>Eliane Santos</h3>
                  <span>38566320</span>
                </div>
              </div>
              <p>É comunicativa, proativa, criativa e dedicada, características que fortalecem sua capacidade de trabalhar em equipe e encontrar soluções inovadoras. Suas soft skills ressaltam um perfil versátil e colaborativo, pronto para atuar em diversas áreas.</p>
            </div>
          </li>

          <li>
            <div className='card'>
              <div className="user-info">
                <img src={Foto_c} alt="" />
                <div>
                  <h3>Erick Chaves</h3>
                  <span>38566427</span>
                </div>
              </div>
              <p>É proativa, tem boa comunicação, inteligência emocional e facilidade na tomada de decisão, características que fortalecem sua atuação em grupo e no enfrentamento de desafios. Suas soft skills evidenciam um perfil equilibrado, capaz de aliar técnica e maturidade emocional no dia a dia.</p>
            </div>
          </li>

          <li>
            <div className='card'>
              <div className="user-info">
                <img src={Foto_d} alt="" />
                <div>
                  <h3>Nicolly Chaves</h3>
                  <span>38566605</span>
                </div>
              </div>
              <p>É comunicativa, proativa, criativa e expressiva, qualidades que potencializam sua atuação em equipe e a tornam capaz de transformar ideias em soluções concretas. Suas soft skills demonstram dinamismo e versatilidade, características essenciais para enfrentar novos desafios.</p>
            </div>
          </li>

        </ul>

      </div>

      <button className="btn-criadores back-btn" onClick={cardForward}>
        <ArrowRight size={20} />
      </button>
        
      
    </div>
  )
}

export default Criadores
