import React from "react";
import './styles.css';
import logo from '../../assets/login_icon.png';

export default function Login(){
    return(
        <div className="login-container">
            <section className="form">
                <img src={logo} id="imgLogin" alt="Imagem de um homem com um cadeado simbolizando uma área restrita que precisa de uma chave para destrancar" />
                <form>
                    <h1>Cadastro de Alunos</h1>
                    <input type="text" id="txtLogin" placeholder="Seu e-mail" />                    
                    <input type="password" placeholder="Sua senha" />
                    <button class="button btn btn-primary" type="submit">Login</button>
                </form>
            </section>
        </div>
    )
}