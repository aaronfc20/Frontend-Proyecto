import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboardUsuario.css';

const DashboardUsuario = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellidoPaterno: '',
        genero: '',
        fechaNacimiento: '',
        peso: '',
        altura: '',
        tipoSangre: ''
    });
    const [isEditing, setIsEditing] = useState(false); 
    const [tipIndex, setTipIndex] = useState(0); // Estado para el índice de los tips de salud
    const [appointments, setAppointments] = useState([]); // Estado para almacenar las citas
    const navigate = useNavigate();

    const healthTips = [
        "Come alimentos variados y frescos: Incluir frutas, verduras y granos enteros en tu dieta mejora tu salud y te aporta los nutrientes necesarios.",
        "Realiza actividad física diaria: Intenta hacer al menos 30 minutos de ejercicio al día, como caminar, correr o hacer yoga",
        "Duerme bien todas las noches: Dormir entre 7 y 8 horas ayuda a tu cuerpo a recuperarse y mejora tu concentración",
        "Gestiona el estrés con respiración profunda: Practicar técnicas de relajación como la respiración profunda ayuda a reducir el estrés diario",
        "Bebe suficiente agua: Mantente hidratado tomando alrededor de 8 vasos de agua al día para un óptimo funcionamiento del cuerpo"
    ];

    useEffect(() => {
        // Obtener los datos del usuario desde localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserData({
                ...userData,
                nombre: user.nombres,
                apellidoPaterno: user.apellidoPaterno,
                genero: user.genero,
                fechaNacimiento: user.fechaNacimiento,
            });
        }
    }, []);

    // Cambiar el índice de tip cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((prevIndex) => (prevIndex + 1) % healthTips.length);
        }, 5000);

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [healthTips.length]);

    // Calcular la edad a partir de la fecha de nacimiento
    const calculateAge = (fechaNacimiento) => {
        const birthDate = new Date(fechaNacimiento);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    // Alternar entre modos de edición y guardar
    const toggleEditMode = () => {
        if (isEditing) {
            localStorage.setItem('user', JSON.stringify({ ...userData }));
            alert('Datos guardados exitosamente');
        }
        setIsEditing(!isEditing);
    };

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Agregar una nueva cita al estado
    const addAppointment = (tipo, fecha, hora) => {
        const newAppointment = { tipo, fecha, hora };
        setAppointments([...appointments, newAppointment]);
    };

    return (
        <div id="dashboard-container">
            <h2 id="dashboard-title">¡Bienvenido {userData.nombre} {userData.apellidoPaterno}!</h2>
            <p id="dashboard-subtitle">Aquí podrás reservar, pagar tus citas presenciales o teleconsultas, y acceder a tu información de manera fácil y segura.</p>

            <div id="button-group">
                <button onClick={() => navigate('/reservar-cita-presencial')} className="dashboard-button">
                    Reservar Cita Presencial
                </button>
                <button onClick={() => navigate('/reservar-teleconsulta')} className="dashboard-button">
                    Reservar Teleconsulta
                </button>
            </div>

            <div className="content-container">
                <div className="table-and-button-container">
                    <table id="user-info-table">
                        <tbody>
                            <tr>
                                <th>Género</th>
                                <td>{userData.genero}</td>
                            </tr>
                            <tr>
                                <th>Edad</th>
                                <td>{calculateAge(userData.fechaNacimiento)}</td>
                            </tr>
                            <tr>
                                <th>Peso (kg)</th>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="peso"
                                            value={userData.peso}
                                            onChange={handleChange}
                                            placeholder="Peso"
                                        />
                                    ) : (
                                        userData.peso
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th>Altura (cm)</th>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="altura"
                                            value={userData.altura}
                                            onChange={handleChange}
                                            placeholder="Altura"
                                        />
                                    ) : (
                                        userData.altura
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th>Tipo de Sangre</th>
                                <td>
                                    {isEditing ? (
                                        <select
                                            name="tipoSangre"
                                            value={userData.tipoSangre}
                                            onChange={handleChange}
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    ) : (
                                        userData.tipoSangre
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="button-container">
                        <button onClick={toggleEditMode} id="save-button">
                            {isEditing ? 'Guardar Cambios' : 'Editar'}
                        </button>
                    </div>
                </div>

                <div id="health-tips">
                    <h3>Tips de Salud</h3>
                    <p>{healthTips[tipIndex]}</p>
                </div>
            </div>

            {/* Título de la sección de citas programadas como un display */}
            <h3 className="appointments-title">
                <i className="fas fa-calendar-alt"></i> Citas Presenciales y Teleconsultas Programadas
            </h3>

            {/* Contenedor de citas */}
            <div className="appointments-section">
                {appointments.length === 0 ? (
                    <p>No tiene citas programadas por el momento.</p>
                ) : (
                    <ul>
                        {appointments.map((appointment, index) => (
                            <li key={index}>
                                <strong>Tipo:</strong> {appointment.tipo} <br />
                                <strong>Fecha:</strong> {appointment.fecha} <br />
                                <strong>Hora:</strong> {appointment.hora}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DashboardUsuario;
