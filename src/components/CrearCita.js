import React, { useState } from 'react';
import axios from 'axios';
import './CrearCita.css';

const CrearCita = () => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [pacienteId, setPacienteId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/citas', {
                fecha,
                hora,
                pacienteId,
                doctorId,
            });

            // Verifica si la respuesta y los datos son válidos
            if (response && response.data) {
                setMessage('Cita creada exitosamente');
            } else {
                setMessage('Hubo un problema al crear la cita.');
            }

            // Opcional: Limpia los campos del formulario después de crear la cita
            setFecha('');
            setHora('');
            setPacienteId('');
            setDoctorId('');
        } catch (error) {
            console.error('Error al crear la cita:', error);
            setMessage(
                'Error al crear la cita: ' +
                    (error.response && error.response.data
                        ? error.response.data.message
                        : error.message)
            );
        }
    };

    return (
        <div className="crear-cita-container">
            <h2>Crear Cita Médica</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Fecha:</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Hora:</label>
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ID del Paciente:</label>
                    <input
                        type="text"
                        value={pacienteId}
                        onChange={(e) => setPacienteId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ID del Médico:</label>
                    <input
                        type="text"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear Cita</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default CrearCita;
