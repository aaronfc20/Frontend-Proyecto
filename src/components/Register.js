import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './register.css'; // Asegúrate de que la ruta sea correcta

const Register = () => {
    const [formData, setFormData] = useState({
        dni: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombres: '',
        fechaNacimiento: '',
        numeroCelular: '',
        genero: '',
        correoElectronico: '',
        passwrod: '',
        role: 'user'
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar la solicitud POST al backend
            const res = await axios.post('http://localhost:3001/api/users/register', formData);
            setMessage('Usuario registrado con éxito');
            setTimeout(() => {
                navigate('/'); // Redirige al login
            }, 3000);
        } catch (err) {
            console.error(err);
            setMessage('Error al registrar el usuario');
        }
    };
    
    return (
        <div className="register-page">
            <div className="register-form">
                <h2>Registro de Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>DNI:</label>
                        <input
                            type="text"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Apellido Paterno:</label>
                        <input
                            type="text"
                            name="apellidoPaterno"
                            value={formData.apellidoPaterno}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Apellido Materno:</label>
                        <input
                            type="text"
                            name="apellidoMaterno"
                            value={formData.apellidoMaterno}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Nombres:</label>
                        <input
                            type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Número de Celular:</label>
                        <input
                            type="text"
                            name="numeroCelular"
                            value={formData.numeroCelular}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Género:</label>
                        <select name="genero" value={formData.genero} onChange={handleChange} required>
                            <option value="">Seleccione</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                    <div>
                        <label>Correo Electrónico:</label>
                        <input
                            type="email"
                            name="correoElectronico"
                            value={formData.correoElectronico}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password} // Corregido aquí
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Registrar</button>
                </form>

                {message && <p>{message}</p>}
                <p>¿Ya tienes una cuenta? <Link to="/">Volver al login</Link></p>
            </div>
        </div>
    );
};

export default Register;