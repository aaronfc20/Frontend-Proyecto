import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [role, setRole] = useState('user'); // Por defecto usuario
    const [dniOrCode, setDniOrCode] = useState(''); // Almacena DNI o Código de colegiatura
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Cerrar el popup de error
    const closeErrorPopup = () => {
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar al backend según el rol seleccionado
            const res = await axios.post('http://localhost:3001/api/auth/login', {
                role,
                dniOrCode,
                password
            });
            // Guardar el token y los datos del usuario en localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user)); // Guardar el usuario completo

            // Redireccionar a los dashboards respectivos
            if (res.data.user.role === 'doctor') {
                window.location.href = '/dashboard-doctor';
            } else {
                window.location.href = '/dashboard-usuario';
            }
        } catch (err) {
            setError('Credenciales inválidas'); // Mostramos el error
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Selecciona si eres Usuario o Médico:
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">Usuario</option>
                            <option value="doctor">Médico</option>
                        </select>
                    </label>

                    {role === 'user' ? (
                        <input
                            type="text"
                            placeholder="DNI"
                            value={dniOrCode}
                            onChange={(e) => setDniOrCode(e.target.value)}
                            required
                        />
                    ) : (
                        <input
                            type="text"
                            placeholder="Código de colegiatura"
                            value={dniOrCode}
                            onChange={(e) => setDniOrCode(e.target.value)}
                            required
                        />
                    )}

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Iniciar Sesión</button>

                    {/* Enlace a la página de registro */}
                    <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
                </form>

                {/* Mostrar el pop-up de error si hay un mensaje de error */}
                {error && (
                    <div className="popup">
                        <div className="popup-content">
                            <h3>Error</h3>
                            <p>{error}</p>
                            <button onClick={closeErrorPopup}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
