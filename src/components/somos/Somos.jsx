import React from 'react'
import './Somos.css'
import Logo from '../../assets/imagens/Logo.png'

const somos = () => {
    return (
        <div className='somos'>

            <div className='somos-left'>

                <img src={Logo} alt="" className='somos-img' />

            </div>

            <div className='somos-right'>

                <h3>Sobre nós</h3>
                <h2>Wishy</h2>

                <p>A Wishy nasceu para levar leveza, diversão e aprendizado ao dia a dia das crianças, acreditando que brincar é uma forma poderosa de estimular a criatividade, desenvolver habilidades e criar memórias inesquecíveis. Nosso propósito é transformar cada experiência em um momento especial, onde a imaginação ganha espaço e o aprendizado acontece de forma natural e lúdica.</p>

                <p>Guiados por valores como diversão com propósito, cuidado, respeito e acolhimento, buscamos sempre unir simplicidade e encantamento em tudo o que fazemos. Nossa missão é oferecer experiências que inspirem e ensinem, tornando a Wishy referência em transformar momentos simples em memórias mágicas que acompanham o desenvolvimento infantil.</p>

            </div>

        </div>
    )
}

export default somos
