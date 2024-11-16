import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './step3.css';

const Step3 = ({ sede, especialidad, setDoctor, setFecha, setHora }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedTime, setConfirmedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(''); // Doctor seleccionado

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const doctorsByDistrict = {
    "Miraflores": {
      "Medicina General": ["Dr. García", "Dr. Pérez"],
      "Pediatría": ["Dra. Ramírez", "Dr. López"],
      "Cardiología": ["Dr. Hernández", "Dra. Morales"],
      "Dermatología": ["Dr. Rivera", "Dra. Torres"],
      "Neurología": ["Dra. Castillo", "Dr. Vargas"]
    },
    "San Isidro": {
      "Medicina General": ["Dr. Mendoza", "Dr. Torres"],
      "Pediatría": ["Dra. Ortiz", "Dr. Guzmán"],
      "Cardiología": ["Dr. Vega", "Dra. Sánchez"],
      "Dermatología": ["Dra. Núñez", "Dr. Carrasco"],
      "Neurología": ["Dr. Esteban", "Dra. Paredes"]
    },
    "Surco": {
      "Medicina General": ["Dr. Blanco", "Dra. Rojas"],
      "Pediatría": ["Dra. Morales", "Dr. Soto"],
      "Cardiología": ["Dr. Ruiz", "Dra. Cáceres"],
      "Dermatología": ["Dr. Huerta", "Dra. Lara"],
      "Neurología": ["Dra. Montoya", "Dr. Valdez"]
    },
    "San Borja": {
      "Medicina General": ["Dr. Silva", "Dra. Campos"],
      "Pediatría": ["Dr. Delgado", "Dra. Romero"],
      "Cardiología": ["Dra. Suárez", "Dr. Robles"],
      "Dermatología": ["Dra. Jiménez", "Dr. Poma"],
      "Neurología": ["Dr. Oliva", "Dra. Meza"]
    },
    "La Molina": {
      "Medicina General": ["Dr. Sánchez", "Dra. Torres"],
      "Pediatría": ["Dra. Reyes", "Dr. Ramírez"],
      "Cardiología": ["Dr. León", "Dra. Vargas"],
      "Dermatología": ["Dr. Moreno", "Dra. Vega"],
      "Neurología": ["Dra. Castillo", "Dr. Chávez"]
    }
  };

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setConfirmedTime(selectedTime);
    setShowConfirmation(false);
    setFecha(selectedDate);
    setHora(selectedTime);
    setDoctor(selectedDoctor); // Guardamos el doctor seleccionado
  };

  const handleCancel = () => {
    setSelectedTime(null);
    setShowConfirmation(false);
  };

  const getDisabledTimes = (date) => {
    const disabled = [];
    if (date.toDateString() === currentDate.toDateString()) {
      availableTimes.forEach((time) => {
        const [hour, minute] = time.split(':').map(Number);
        if (hour < currentHour || (hour === currentHour && minute <= currentMinute)) {
          disabled.push(time);
        }
      });
    }
    return disabled;
  };

  // Filtramos los doctores de acuerdo con el distrito y la especialidad seleccionada
  const filteredDoctors = sede && especialidad 
    ? doctorsByDistrict[sede]?.[especialidad] || []
    : [];

  return (
    <div className="step3-container">
      <h2>Selecciona tu fecha y hora</h2>
      <p>Selecciona una fecha para hacer tu reserva</p>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date()}
        tileClassName={({ date, view }) => {
          if (date.toDateString() === selectedDate?.toDateString()) {
            return 'react-calendar__tile--active';
          }
          if (date < currentDate) {
            return 'react-calendar__tile--disabled';
          }
        }}
      />

      {selectedDate && (
        <div className="horarios-container">
          <h3>Horarios disponibles para {selectedDate.toDateString()}:</h3>
          <div className="horarios">
            {availableTimes.map((time) => {
              const isDisabled = getDisabledTimes(selectedDate).includes(time);
              return (
                <button
                  key={time}
                  className={`horario-btn ${isDisabled ? 'disabled' : ''} ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => !isDisabled && handleTimeSelection(time)}
                  disabled={isDisabled}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>¿Estás seguro de seleccionar este horario: {selectedTime}?</p>
          <button className="confirmation-btn" onClick={handleConfirm}>Sí</button>
          <button className="confirmation-btn" onClick={handleCancel}>No</button>
        </div>
      )}

      {confirmedTime && (
        <div className="doctors-selection">
          <h3>Selecciona un doctor para el horario {confirmedTime}:</h3>
          {filteredDoctors.length > 0 ? (
            <select onChange={(e) => setSelectedDoctor(e.target.value)} value={selectedDoctor}>
              <option value="">Selecciona un doctor</option>
              {filteredDoctors.map((doctor, index) => (
                <option key={index} value={doctor}>{doctor}</option>
              ))}
            </select>
          ) : (
            <p>No hay doctores disponibles para esta especialidad y distrito.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Step3;



