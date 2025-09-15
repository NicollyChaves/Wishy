import React from 'react'
import './Hero.css'
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate();

  return (
    <div className='hero'>
      <div className="hero-text container">
        <h1>Wishy</h1>
        <p>“Onde os sonhos aprendem a ler e contar.”</p>
        <button className='btn' onClick={() => navigate('/jogo')}>Jogar</button>
      </div>

    </div>
  )
}

export default Hero
