import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './step3.css';

const Step3 = ({ sede, especialidad, setDoctor, setFecha, setHora, tipoCita }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
  ];

  // Llamada al backend para obtener los doctores filtrados
  useEffect(() => {
    let url = `http://localhost:3001/api/medicos/filtrar?especialidad=${especialidad}`;
    if (tipoCita === 'presencial') {
        url += `&sede=${sede}`; // Solo filtrar por sede si es cita presencial
    }

    console.log('URL generada:', url); // DEBUG: Verifica la URL generada

    if (especialidad) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log('Doctores recibidos:', data); // DEBUG: Verifica la respuesta del backend
                setDoctors(data);
            })
            .catch((error) => console.error('Error al cargar doctores:', error));
    }
  }, [sede, especialidad, tipoCita]);


  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setFecha(date.toISOString());
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setHora(time);
  };

  const handleDoctorSelection = (doctorId) => {
    const doctor = doctors.find((doc) => doc.id === parseInt(doctorId, 10));
    setSelectedDoctor(doctor);
  };

  const handleConfirm = () => {
    setDoctor(selectedDoctor);
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
            <p>
              No hay doctores disponibles para esta especialidad{' '}
              {tipoCita === 'presencial' ? 'y sede seleccionadas' : 'seleccionada'}.
            </p>
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
