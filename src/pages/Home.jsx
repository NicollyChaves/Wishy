import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Hero from '../components/hero/Hero';
import Titulo from '../components/titulos/Titulo';
import Somos from '../components/somos/Somos';
import Criadores from '../components/criadores/Criadores';
import Projeto from '../components/projeto/Projeto';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';

const Home = () => {
    return (
        <div>

            <Navbar />
            <Hero />

            <div className='container'>

                <Somos />

                <Titulo subTitle='Galeria de' title='Projetos' />
                <Projeto />

                <Titulo title='Criadores' />
                <Criadores />

                <Titulo subTitle='Estamos aqui para ouvir você' title='Entre em Contato' />
                <Contact />

                <Footer />

            </div>

        </div>
    )
}

export default Home
