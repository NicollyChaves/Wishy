import React from 'react';
import './Navbar.css';
import logo from '../../assets/imagens/Logo_Sem_Fundo.png';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

    const navigate = useNavigate();

    return (
        <nav className='container'>
            <img src= {logo} alt="" className='logo'/>
            <ul>
                <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
                <li><Link to='somos'smooth={true} offset={-260} duration={500}>Somos</Link></li>
                <li><Link to='projeto'smooth={true} offset={-280} duration={500}>Projetos</Link></li>
                <li><Link to='criadores'smooth={true} offset={-260} duration={500}>Criadores</Link></li>
                <li><Link to='contact'smooth={true} offset={-260} duration={500}>Contato</Link></li>
                <li><button className='btn' onClick={() => navigate('/jogo')}>Jogo</button></li>
            </ul>
        </nav>
    );
}

export default Navbar;