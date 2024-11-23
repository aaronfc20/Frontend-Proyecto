import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [role, setRole] = useState('user'); // Por defecto usuario
    const [dniOrCode, setDniOrCode] = useState(''); // Almacena DNI o Correo electrónico
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Cerrar el popup de error
    const closeErrorPopup = () => {
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Enviar datos de inicio de sesión al backend
            const res = await axios.post('http://localhost:3001/api/auth/login', {
                role,
                dniOrCode,
                password
            });
    
            // Verificar datos recibidos
            console.log("Datos del usuario:", res.data.user);
    
            // Guardar token y datos del usuario completos
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('userId', res.data.user.id); // Guardar solo el ID
            localStorage.setItem('role', res.data.user.role); // Guardar el rol (doctor o user)
    
            // Redireccionar según el rol
            if (res.data.user.role === 'doctor') {
                window.location.href =  `/dashboard-doctor/${res.data.user.role}/${res.data.user.id}`;
            } else {
                window.location.href = `/dashboard-usuario/${res.data.user.role}/${res.data.user.id}`;
            }
        } catch (err) {
            setError('Credenciales inválidas');
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
                            type="email" // Cambiado a email para validación automática de correo electrónico
                            placeholder="Correo Electrónico"
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
