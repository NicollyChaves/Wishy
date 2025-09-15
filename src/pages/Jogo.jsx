import React from 'react'
import { Routes, Route } from 'react-router-dom';
//import './Jogo.css';
import Game from '../components/RunnerGame/Game';

const Jogo = () => {

    return (
        <div>

            <Routes>
                <Route path="/" element={<Game />} />
            </Routes>

        </div>
    )
}

export default Jogo
