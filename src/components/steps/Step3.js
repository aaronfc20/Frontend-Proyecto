// Step3.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './step3.css';

const Step3 = ({ nombre, apellidoPaterno, sede, especialidad, citasExistentes, setDoctor, setFecha, setHora }) => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [doctoresDisponibles, setDoctoresDisponibles] = useState([]);
    const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);

    const doctores = {
        "Medicina General": ["Dr. García", "Dr. Pérez"],
        "Pediatría": ["Dra. Ramírez", "Dr. López"],
        "Cardiología": ["Dr. Hernández", "Dra. Morales"],
        "Dermatología": ["Dr. Rivera", "Dra. Torres"],
        "Neurología": ["Dra. Castillo", "Dr. Vargas"]
    };

    useEffect(() => {
        if (especialidad && doctores[especialidad]) {
            setDoctoresDisponibles(doctores[especialidad]);
        }
    }, [especialidad]);

    const handleFechaChange = (date) => {
        setFechaSeleccionada(date);
        setFecha(date); // Guardar la fecha seleccionada en el estado principal
        setDoctorSeleccionado(null);
        setHorariosDisponibles([]);
    };

    const handleDoctorChange = (doctor) => {
        setDoctorSeleccionado(doctor);
        setDoctor(doctor); // Guardar el doctor seleccionado en el estado principal

        const horarios = [];
        for (let hora = 14; hora <= 20; hora++) {
            const horario = `${hora}:00`;
            const citaConflicto = citasExistentes && citasExistentes.some(
                (cita) =>
                    cita.doctor === doctor &&
                    fechaSeleccionada &&
                    cita.fecha.toDateString() === fechaSeleccionada.toDateString() &&
                    cita.horario === horario
            );
            if (!citaConflicto) {
                horarios.push(horario);
            }
        }
        setHorariosDisponibles(horarios);
    };

    const handleHorarioChange = (horario) => {
        setHora(horario); // Guardar el horario seleccionado en el estado principal
    };

    const isDateSelectable = (date) => {
        const today = new Date();
        return date > today && date.getDay() !== 0;
    };

    return (
        <div className="step3-container">
            <h2>Reservar Cita - {nombre} {apellidoPaterno} - {sede}</h2>
            
            <p>¡Es muy fácil! Puedes reservar tu cita seleccionando la fecha.</p>
            <label>Seleccione fecha de reserva:</label>
            <DatePicker
                selected={fechaSeleccionada}
                onChange={handleFechaChange}
                filterDate={isDateSelectable}
                placeholderText="Seleccione una fecha"
                dateFormat="dd/MM/yyyy"
                className="date-picker"
            />

            {fechaSeleccionada && (
                <>
                    <label>Seleccione un doctor:</label>
                    <select onChange={(e) => handleDoctorChange(e.target.value)} value={doctorSeleccionado || ''}>
                        <option value="">Seleccione un doctor</option>
                        {doctoresDisponibles.map((doctor, index) => (
                            <option key={index} value={doctor}>{doctor}</option>
                        ))}
                    </select>
                </>
            )}

            {doctorSeleccionado && (
                <>
                    <label>Seleccione un horario:</label>
                    <select onChange={(e) => handleHorarioChange(e.target.value)} value="">
                        <option value="">Seleccione un horario</option>
                        {horariosDisponibles.map((horario, index) => (
                            <option key={index} value={horario}>{horario}</option>
                        ))}
                    </select>
                </>
            )}
        </div>
    );
};

export default Step3;
