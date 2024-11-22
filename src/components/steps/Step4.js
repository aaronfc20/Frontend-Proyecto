import React from 'react';
import './step4.css';

const Step4 = ({
    doctorSeleccionado,
    fechaSeleccionada,
    horaSeleccionada,
    nombre,
    apellidoPaterno,
    especialidad,
    sede,
    tipoSeguro,
}) => {
    // Formatear fecha seleccionada
    const formattedFecha = fechaSeleccionada
        ? new Date(fechaSeleccionada).toLocaleDateString()
        : 'No seleccionada';

    // Asegurarse de que el doctorSeleccionado tiene los campos necesarios
    const doctorNombreCompleto = doctorSeleccionado
        ? `${doctorSeleccionado.nombres} ${doctorSeleccionado.apellidoPaterno} ${doctorSeleccionado.apellidoMaterno}`
        : 'No seleccionado';

    return (
        <div className="step4-container">
            <h2 className="step4-title">
                Resumen de la Cita - {nombre} {apellidoPaterno} - {sede || 'No seleccionada'}
            </h2>
            <p className="step4-description">
                Revisa los detalles de tu cita antes de confirmarla.
            </p>

            <table className="step4-table">
                <tbody>
                    <tr>
                        <th>Especialidad</th>
                        <td>{especialidad || 'No seleccionada'}</td>
                    </tr>
                    <tr>
                        <th>Sede</th>
                        <td>{sede || 'No seleccionada'}</td>
                    </tr>
                    <tr>
                        <th>Fecha de la cita</th>
                        <td>{formattedFecha}</td>
                    </tr>
                    <tr>
                        <th>Hora</th>
                        <td>{horaSeleccionada || 'No seleccionada'}</td>
                    </tr>
                    <tr>
                        <th>Doctor</th>
                        <td>{doctorNombreCompleto}</td>
                    </tr>
                    <tr>
                        <th>Tipo de Seguro</th>
                        <td>{tipoSeguro || 'No especificado'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Step4;


