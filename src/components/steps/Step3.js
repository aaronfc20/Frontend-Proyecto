import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './step3.css';

const Step3 = ({ sede, especialidad, setDoctor, setFecha, setHora }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Ahora almacena el objeto del doctor
  const [doctors, setDoctors] = useState([]); // Lista de doctores desde el backend

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
  ];

  // Llamada al backend para obtener los doctores filtrados
  useEffect(() => {
    if (sede && especialidad) {
      fetch(`http://localhost:3001/api/medicos/filtrar?sede=${sede}&especialidad=${especialidad}`)
        .then((response) => response.json())
        .then((data) => setDoctors(data))
        .catch((error) => console.error('Error al cargar doctores:', error));
    }
  }, [sede, especialidad]);

  // Maneja el cambio de fecha
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reiniciar la hora al cambiar la fecha
    setFecha(date.toISOString()); // Guardar en formato ISO
  };

  // Maneja la selección de horario
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setHora(time); // Guardar directamente en el estado global
    setShowConfirmation(false); // Ocultar confirmación si se cambia el horario
  };

  // Maneja la selección del doctor
  const handleDoctorSelection = (doctorId) => {
    const doctor = doctors.find((doc) => doc.id === parseInt(doctorId, 10));
    setSelectedDoctor(doctor);
  };

  // Maneja la confirmación final
  const handleConfirm = () => {
    setDoctor(selectedDoctor); // Enviar el objeto completo del doctor al estado global
    setShowConfirmation(false); // Ocultar cuadro de confirmación
    alert(
      `Cita confirmada para el ${selectedDate.toLocaleDateString()} a las ${selectedTime} con el Dr. ${selectedDoctor.nombres} ${selectedDoctor.apellidoPaterno}.`
    );
  };

  return (
    <div className="step3-container">
      <h2>Selecciona tu fecha y hora</h2>
      <p>Selecciona una fecha para hacer tu reserva:</p>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date()}
      />

      {/* Mostrar horarios disponibles */}
      {selectedDate && (
        <div className="horarios-container">
          <h3>Horarios disponibles para {selectedDate.toLocaleDateString()}:</h3>
          <div className="horarios">
            {availableTimes.map((time) => (
              <button
                key={time}
                className={`horario-btn ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeSelection(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mostrar selección de doctores */}
      {selectedTime && (
        <div className="doctors-selection">
          <h3>Selecciona un doctor para {selectedTime}:</h3>
          {doctors.length > 0 ? (
            <select
              onChange={(e) => handleDoctorSelection(e.target.value)}
              value={selectedDoctor?.id || ''}
            >
              <option value="">Selecciona un doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.nombres} {doctor.apellidoPaterno} {doctor.apellidoMaterno}
                </option>
              ))}
            </select>
          ) : (
            <p>No hay doctores disponibles para esta especialidad y sede seleccionadas.</p>
          )}
        </div>
      )}

      {/* Mostrar cuadro de confirmación */}
      {selectedDoctor && selectedTime && (
        <div className="confirmation-dialog">
          <p>
            ¿Confirmas el horario {selectedTime} con el Dr.{' '}
            {selectedDoctor.nombres} {selectedDoctor.apellidoPaterno}?
          </p>
          <button onClick={handleConfirm} className="confirmation-btn">
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
};

export default Step3;
