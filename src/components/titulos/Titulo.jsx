import React from "react";
import './Titulo.css';

const titulo = ({subTitle, title}) => {

    return (

        <div className="titulo">
            <p>{subTitle}</p>
            <h2>{title}</h2>
        </div>

    );

}

export default titulo;