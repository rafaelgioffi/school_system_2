import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiXCircle, FiEdit, FiUserX} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import NewStudentLogo from '../../assets/new_student.png';

export default function Students() {

    const [name, setName] = useState('');
    const [students, setStudents] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const history = useHistory();

    const [searchInput, setSearchInput] = useState('');
    const [filter, setFilter] = useState([]);

    const authorization = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    useEffect( ()=> {
        api.get('api/students', authorization).then(
            response => {setStudents(response.data);
            }, token)
    })

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token','');
            authorization.headers = '';
            history.push('/');
        } catch(error) {
            document.getElementById('studentsMsg').innerHTML = 'Não foi possível realizar logout. Erro: ' + error;
        }
    }

    async function editStudent(id) {
        try {
            history.push(`student/newstudent/${id}`);
        }
        catch(error) {
            alert('Não foi possível editar o(a) aluno(a), tente novamente...');
        }
    }

    const searchStudents = (searchValue) => {
        setSearchInput(searchValue);

        if (searchInput !== '') {
            const FilteredData = students.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            });
            setFilter(FilteredData);
        }
        else {
            setFilter(students);
        }
    }

    async function deleteStudent(id, name) {
        try {
            if(window.confirm('Tem certeza que deseja excluir o(a) aluno(a) ' + name + ', matricula ' + id + '?'))
            {
                await api.delete(`api/students/${id}`, authorization);
                setStudents(students.filter(student => student.id !== id));
            }
        } catch (error) {
            document.getElementById('studentsMsg').innerHTML = 'Erro ao excluir o(a) aluno(a). Tente novamente...\nErro: ' + error;
        }
    }

    return (
        <div className="student-container">
            <header>
                <img src={NewStudentLogo} alt="Ícone de um estudante com um capelo simbolizando o cadastro de um novo aluno" />
                <span>Bem-Vindo(a), <strong>{email}</strong>!</span>
                <Link className="button btn btn-outline-success" to="student/newstudent/0">Novo Aluno</Link>
                <button type="button" onClick={logout}>
                    <FiXCircle size={35} color="#17202a" />
                </button>
                <p id='studentsMsg'></p>
            </header>
            <form>
                <input type="text" placeholder="Digite para filtrar alunos" onChange={(e) => searchStudents(e.target.value)} />
                {/* <button type="button" class="button btn btn-outline-secondary">
                    Buscar aluno(a)
                </button> */}
            </form>
            <h1>Relação de Alunos</h1>
            {searchInput.length > 1 ? (
            <ul>
                {filter.map(student=>(
                    <li key={student.id}>
                    <b>Nome:</b> {student.name}<br/><br/>
                    <b>E-mail:</b> {student.email}<br/><br/>
                    <b>Idade:</b> {student.age}<br/><br/>
                    <button type='button' onClick={()=> editStudent(student.id)}>
                        <FiEdit size="25" color="#17202a" />
                    </button>
                    <button type='button' onClick={()=> deleteStudent(student.id, student.name)}>
                        <FiUserX size="25" color="#17202a" />
                    </button>
                </li>               
                ))}
            </ul>
            ) : (
                <ul>
                {students.map(student=>(
                    <li key={student.id}>
                    <b>Nome:</b> {student.name}<br/><br/>
                    <b>E-mail:</b> {student.email}<br/><br/>
                    <b>Idade:</b> {student.age}<br/><br/>
                    <button type='button' onClick={()=> editStudent(student.id)}>
                        <FiEdit size="25" color="#17202a" />
                    </button>
                    <button type='button' onClick={()=> deleteStudent(student.id, student.name)}>
                        <FiUserX size="25" color="#17202a" />
                    </button>
                </li>               
                ))}
            </ul>
            )}
        </div>
    );
}