import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './register.css'; // Asegúrate de que la ruta sea correcta

const Register = () => {
    const [name, setName] = useState('');
    const [dniOrCode, setDniOrCode] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Por defecto es 'user'
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar la solicitud POST al backend
            const res = await axios.post('http://localhost:3001/api/users/register', {
                name,
                dniOrCode,
                password,
                role
            });

            // Mostrar el mensaje de éxito
            setMessage('Usuario registrado con éxito');

            // Redirigir al login después de 3 segundos
            setTimeout(() => {
                navigate('/'); // Redirige al login
            }, 3000); // Espera 3 segundos antes de redirigir

        } catch (err) {
            console.error(err);
            setMessage('Error al registrar el usuario');
        }
    };

    return (
        <div className="register-page"> {/* Clase específica para el registro */}
            <div className="register-form"> {/* Clase específica para encapsular estilos */}
                <h2>Registro de {role === 'user' ? 'Usuario' : 'Doctor'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>{role === 'user' ? 'DNI:' : 'Código de colegiatura:'}</label>
                        <input
                            type="text"
                            value={dniOrCode}
                            onChange={(e) => setDniOrCode(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Rol:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">Usuario</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>
                    <button type="submit">Registrar</button>
                </form>

                {/* Mostrar mensaje de éxito o error */}
                {message && <p>{message}</p>}

                {/* Botón para volver al login */}
                <p>¿Ya tienes una cuenta? <Link to="/">Volver al login</Link></p>
            </div>
        </div>
    );
};

export default Register;
