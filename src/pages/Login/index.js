import React, {useState} from "react";
import api from '../../services/api';
import {useHistory} from 'react-router-dom';
import './styles.css';
import logo from '../../assets/login_icon.png';

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function login(event) {
        event.preventDefault();

        const data = {
            email, password
        };

        try {
            document.getElementById('btnLogin').disabled = true;
            document.getElementById('btnLogin').innerHTML = 'Autenticando...';
            
            const response = await api.post('api/account/loginuser', data);
            
            localStorage.setItem('email',email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);
            
            history.push('/students');            
        } catch(error) {
            // alert('Falha ao realizar o login ' + error)
            document.getElementById('msgLogin').innerHTML = 'Falha ao realizar o login ' + error;
            document.getElementById('btnLogin').innerHTML = 'Login';
            document.getElementById('btnLogin').disabled = false;            
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logo} id="imgLogin" alt="Imagem de um homem com um cadeado simbolizando uma área restrita que precisa de uma chave para destrancar" />
                <form onSubmit={login}>
                    <h1>Cadastro de Alunos</h1>
                    <p id="msgLogin" className="text-danger"></p>
                    <input type="text" id="txtLogin" placeholder="Seu e-mail" value={email} onChange={e=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Sua senha" value={password} onChange={e=>setPassword(e.target.value)} />
                    <button id="btnLogin" class="button btn btn-primary" type="submit">Login</button>
                </form>
            </section>
        </div>
    )
}