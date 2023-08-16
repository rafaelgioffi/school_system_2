import React, { useEffect, useState } from 'react';
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../services/api';

export default function NewStudent() {

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(16);

    const {studentId} = useParams();
    const history = useHistory();

    const token = localStorage.getItem('token');
    const authorization = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    useEffect(() => {
      if (studentId === '0') 
        return;
      else 
        loadStudent();
    }, studentId);

    async function loadStudent() {
        try{
            const response = await api.get(`api/students/${studentId}`, authorization);

            setId(response.data.id);
            setName(response.data.name);
            setEmail(response.data.email);
            setAge(response.data.age);
        }
        catch(error) {
            document.getElementById('msgStatus').innerHTML = 'Erro ao carregar o(a) aluno(a). Código: ' + error;
            history.push('/students');
        }
    }

    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            name,
            email,
            age
        }

        try {
            if(studentId === '0')
            {
                await api.post('api/students', data, authorization);
            }
            else {
                data.id = id;
                await api.put(`api/students/${id}`, data, authorization)
            }
        }
        catch(error) {
            document.getElementById('msgStatus').innerHTML = 'Erro ao gravar o(a) aluno(a)' + error;
        }
        history.push('/students');
    }

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
                <p id='msgStatus' className='text-danger'></p>
                <form onSubmit={saveOrUpdate}>
                    <input placeholder='Name of student' value={name} onChange={e => setName(e.target.value)} />
                    <input placeholder='E-mail of student' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type='number' placeholder='Age of student' value={age} onChange={e => setAge(e.target.value)} />
                    
                    <button className='button' type='submit'>{studentId === '0' ? 'Cadastrar' : 'Atualizar'}</button>                    
                </form>
            </div>
        </div>
    );
  }