import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboardUsuario.css';

const DashboardUsuario = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellidoPaterno: '',
        genero: 'No especificado',
        fechaNacimiento: '',
        peso: 'No especificado',
        altura: 'No especificado',
        tipoSangre: 'No especificado',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [tipIndex, setTipIndex] = useState(0);
    const [appointments, setAppointments] = useState({
        presenciales: [],
        teleconsultas: []
    });
    const navigate = useNavigate();

    const healthTips = [
        "Come alimentos variados y frescos: Incluir frutas, verduras y granos enteros en tu dieta mejora tu salud y te aporta los nutrientes necesarios.",
        "Realiza actividad física diaria: Intenta hacer al menos 30 minutos de ejercicio al día, como caminar, correr o hacer yoga",
        "Duerme bien todas las noches: Dormir entre 7 y 8 horas ayuda a tu cuerpo a recuperarse y mejora tu concentración",
        "Gestiona el estrés con respiración profunda: Practicar técnicas de relajación como la respiración profunda ayuda a reducir el estrés diario",
        "Bebe suficiente agua: Mantente hidratado tomando alrededor de 8 vasos de agua al día para un óptimo funcionamiento del cuerpo",
    ];

    const toggleEditMode = () => {
        if (isEditing) {
            const updatedUserData = {
                ...userData,
                nombres: userData.nombre || 'No especificado',
            };

            localStorage.setItem('user', JSON.stringify(updatedUserData));
            alert('Datos guardados exitosamente');
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserData({
                nombre: user.nombres || 'No especificado',
                apellidoPaterno: user.apellidoPaterno || 'No especificado',
                genero: user.genero || 'No especificado',
                fechaNacimiento: user.fechaNacimiento || '',
                peso: user.peso || 'No especificado',
                altura: user.altura || 'No especificado',
                tipoSangre: user.tipoSangre || 'No especificado',
            });
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((prevIndex) => (prevIndex + 1) % healthTips.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [healthTips.length]);

    const calculateAge = (fechaNacimiento) => {
        if (!fechaNacimiento) return 'No especificada';
        const birthDate = new Date(fechaNacimiento);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.id) {
                console.error('No se encontró un usuario válido en localStorage.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3001/citas/usuario/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    // Filtrar citas
                    const citasPresenciales = data.filter(appointment => appointment.sede && appointment.sede !== 'Teleconsulta');
                    const teleconsultas = data.filter(appointment => !appointment.sede || appointment.sede === 'Teleconsulta');

                    setAppointments({
                        presenciales: citasPresenciales,
                        teleconsultas: teleconsultas,
                    });
                } else {
                    console.error('Error al obtener las citas:', data.message);
                }
            } catch (error) {
                console.error('Error de conexión:', error);
            }
        };

        fetchAppointments();
    }, []);

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
                {/* Nuevo botón para tests psicológicos gratuitos */}
                <button onClick={() => navigate('/escoger-prueba')} className="dashboard-button">
                    Tests Psicológicos Gratuitos
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
    
            {/* Títulos fuera del contenedor */}
            <div className="appointments-titles">
                <h3 className="appointments-title">Citas Presenciales Programadas</h3>
                <h3 className="appointments-title">Teleconsultas Programadas</h3>
            </div>
    
            {/* Citas */}
            <div className="appointments-wrapper">
                {/* Citas Presenciales */}
                <div className="appointments-column">
                    {appointments.presenciales.length === 0 ? (
                        <p>No tiene citas presenciales programadas.</p>
                    ) : (
                        <ul>
                            {appointments.presenciales.map((appointment, index) => (
                                <li key={index} className="appointment-summary">
                                    <strong>Médico:</strong> {appointment.medico} <br />
                                    <strong>Especialidad:</strong> {appointment.especialidad} <br />
                                    <strong>Sede:</strong> {appointment.sede} <br />
                                    <strong>Tipo:</strong> {appointment.tipoSeguro || 'Particular'} <br />
                                    <strong>Fecha:</strong> {new Date(appointment.fecha).toLocaleDateString()} <br />
                                    <strong>Hora:</strong> {appointment.hora} <br />
                                    <strong>Estado:</strong> {appointment.estado} <br />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
    
                {/* Teleconsultas */}
                <div className="appointments-column">
                    {appointments.teleconsultas.length === 0 ? (
                        <p>No tiene teleconsultas programadas.</p>
                    ) : (
                        <ul>
                            {appointments.teleconsultas.map((appointment, index) => (
                                <li key={index} className="appointment-summary">
                                    <strong>Médico:</strong> {appointment.medico} <br />
                                    <strong>Especialidad:</strong> {appointment.especialidad} <br />
                                    <strong>Tipo:</strong> {appointment.tipoSeguro || 'Particular'} <br />
                                    <strong>Fecha:</strong> {new Date(appointment.fecha).toLocaleDateString()} <br />
                                    <strong>Hora:</strong> {appointment.hora} <br />
                                    <strong>Estado:</strong> {appointment.estado} <br />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardUsuario;
