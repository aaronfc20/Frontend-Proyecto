// Step4.js
import React from 'react';

const Step4 = ({
    doctorSeleccionado,
    fechaSeleccionada,
    horaSeleccionada,
    nombre,
    apellidoPaterno,
    especialidad,
    sede,
    tipoSeguro
}) => {
    return (
        <div className="step4-container">
            <h2>Resumen de la Cita - {nombre} {apellidoPaterno}</h2>
            <p>Revisa los detalles de tu cita antes de confirmarla.</p>

            <div className="resumen-cita">
                <div className="campo">
                    <strong>Especialidad:</strong> {especialidad || 'No seleccionada'}
                </div>
                <div className="campo">
                    <strong>Sede:</strong> {sede || 'No seleccionada'}
                </div>
                <div className="campo">
                    <strong>Fecha de la cita:</strong> {fechaSeleccionada || 'No seleccionada'}
                </div>
                <div className="campo">
                    <strong>Hora:</strong> {horaSeleccionada || 'No seleccionada'}
                </div>
                <div className="campo">
                    <strong>Doctor:</strong> {doctorSeleccionado || 'No seleccionado'}
                </div>
                <div className="campo">
                    <strong>Tipo de Seguro:</strong> {tipoSeguro || 'No especificado'}
                </div>
            </div>

            <div className="botones">
                <button onClick={() => alert("¡Cita confirmada!")} className="btn btn-confirmar">
                    Confirmar Cita
                </button>
                <button onClick={() => alert("¡Cita cancelada!")} className="btn btn-cancelar">
                    Cancelar Cita
                </button>
            </div>
        </div>
    );
};

export default Step4;




