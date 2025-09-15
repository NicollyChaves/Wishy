import React from 'react'
import './Contact.css'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";


const Contact = () => {
  return (
    <div className='contact'>

        <div className="contact-col">
            <h3>Envie sua dúvida ou sugestão</h3>
            <p>Sinta-se à vontade para entrar em contato conosco através do formulário de contato. Seu feedback, perguntas e sugestões são importantes para nós, pois buscamos oferecer um serviço excepcional à nossa comunidade.</p>

            <ul>
                <li> <FaEnvelope className="icon" /> Wishy@gmail.com</li>
                <li> <FaPhone className="icon" /> 0800 721 5844</li>
                <li> <FaMapMarkerAlt className="icon" /> R. Galvão Bueno, 868 - Liberdade, São Paulo - SP, 01506-000</li>
            </ul>
        </div>

        <div className="contact-col">
            <form action="">

                <label>Nome:</label>
                <input type="text" placeholder='Nome' required />

                <label>E-mail:</label>
                <input type="email" placeholder='E-mail' required/>

                <label>Mensagem:</label>
                <textarea name="mensagem" rows={6} placeholder='Mensagem' required></textarea>

                <button type='submit' className='btn-env dark-btn'>Enviar</button>

            </form>
        </div>
      
    </div>
  )
}

export default Contact
