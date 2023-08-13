import React from 'react';
import {Link} from 'react-router-dom';
import {FiXCircle, FiEdit, FiUserX} from 'react-icons/fi';
import './styles.css';
import NewStudentLogo from '../../assets/new_student.png';

export default function Students() {
    return (
        <div className="student-container">
            <header>
                <img src={NewStudentLogo} alt="Ícone de um estudante com um capelo simbolizando o cadastro de um novo aluno" />
                <span>Bem-Vindo(a), <strong>Paula</strong>!</span>
                <Link className="button btn btn-outline-success" to="student/newstudent/0">Novo Aluno</Link>
                <button type="button">
                    <FiXCircle size={35} color="#17202a" />
                </button>
            </header>
            <form>
                <input type="text" placeholder="Informe um(a) aluno(a) para buscar" />
                <button type="button" class="button btn btn-outline-secondary">
                    Buscar aluno(a)
                </button>
            </form>
            <h1>Relação de Alunos</h1>
            <ul>
                <li>
                    <b>Nome: </b>Paulo<br/><br/>
                    <b>E-mail: </b>paulo@email.com.br<br/><br/>
                    <b>Idade: </b>23 anos<br/><br/>
                    <button type='button'>
                        <FiEdit size="25" color="#17202a" />
                    </button>
                    <button type='button'>
                        <FiUserX size="25" color="#17202a" />
                    </button>
                    </li>
                    <li>
                    <b>Nome: </b>Paulo<br/><br/>
                    <b>E-mail: </b>paulo@email.com.br<br/><br/>
                    <b>Idade: </b>23 anos<br/><br/>
                    <button type='button'>
                        <FiEdit size="25" color="#17202a" />
                    </button>
                    <button type='button'>
                        <FiUserX size="25" color="#17202a" />
                    </button>
                </li>               
            </ul>
        </div>
    )
}