// Step4.js
import React from 'react';
import './step4.css';

const Step4 = ({ nombre, apellidoPaterno, sede, especialidad, doctor, fecha, hora, modoAtencion, tipoSeguro }) => {
    return (
        <div className="step4-container">
            <h2>Reservar Cita - {nombre} {apellidoPaterno} - {sede}</h2>
            
            <p>Puedes pagar el día de la cita o pagar en línea de manera segura e ir directamente al consultorio del médico. Además evitarás colas.</p>
            
            <div className="stepper">
                <div className="step">Paso 1</div>
                <div className="step">Paso 2</div>
                <div className="step">Paso 3</div>
                <div className="step active">Paso 4</div>
                <div className="step">Paso 5</div>
            </div>

            <h3>DATOS DE TU CITA</h3>
            <table className="datos-cita">
                <tbody>
                    <tr>
                        <td><strong>Paciente:</strong></td>
                        <td>{nombre} {apellidoPaterno}</td>
                    </tr>
                    <tr>
                        <td><strong>Especialidad:</strong></td>
                        <td>{especialidad}</td>
                    </tr>
                    <tr>
                        <td><strong>Médico:</strong></td>
                        <td>{doctor}</td>
                    </tr>
                    <tr>
                        <td><strong>Sede:</strong></td>
                        <td>{sede}</td>
                    </tr>
                    <tr>
                        <td><strong>Consultorio:</strong></td>
                        <td>Consultorio: 301</td>
                    </tr>
                    <tr>
                        <td><strong>Día y Hora:</strong></td>
                        <td>{fecha.toLocaleDateString()} a las {hora}</td>
                    </tr>
                    <tr>
                        <td><strong>Modo de Atención:</strong></td>
                        <td>{modoAtencion === 'conSeguro' ? `Con seguro (${tipoSeguro})` : 'Particular'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Step4;
