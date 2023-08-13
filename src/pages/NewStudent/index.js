import React from 'react';
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function NewStudent() {

    const {studentId} = useParams();

    return (
        <div className='new-student-container'>
            <div className='content'>
                <section className='form'>
                    <FiUserPlus size={105} color='#17202a' />
                <h1>{studentId === '0' ? 'Incluir novo(a) aluno(a)' : 'Atualizar aluno(a)'}</h1>
                <Link className='back-link' to='/students'>
                    <FiCornerDownLeft size={25} color='#17202a' />
                    Voltar
                </Link>
                </section>
                <form>
                    <input placeholder='Name of student' />
                    <input placeholder='Email of student' />
                    <input placeholder='Age of student' />
                    <button className='button' type='submit'>{studentId === '0' ? 'Cadastrar' : 'Atualizar'}</button>                    
                </form>
            </div>
        </div>
    );
  }