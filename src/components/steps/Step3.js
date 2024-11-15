import React, { useState, useEffect } from 'react';
import './step3.css';

const Step3 = ({ nombre, apellidoPaterno, sede, especialidad, citasExistentes, setDoctor, setFecha, setHora }) => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [doctoresDisponibles, setDoctoresDisponibles] = useState([]);
    const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
    const [horariosMarcados, setHorariosMarcados] = useState({});
    const [fechaActual, setFechaActual] = useState(new Date());
    const [diasDeslizados, setDiasDeslizados] = useState(0); // Para mover el calendario adelante o atrás
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Almacena el horario seleccionado
    const [confirmarSeleccion, setConfirmarSeleccion] = useState(false); // Muestra el mensaje de confirmación

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

    // Función para obtener las fechas de los próximos 30 días (solo fechas futuras)
    const getFechasDeSemana = () => {
        let fechas = [];
        let fechaInicioSemana = new Date(fechaActual);
        fechaInicioSemana.setDate(fechaInicioSemana.getDate() + diasDeslizados); // Ajusta el rango por el desplazamiento

        for (let i = 0; i < 5; i++) {
            const fecha = new Date(fechaInicioSemana);
            fecha.setDate(fecha.getDate() + i);
            if (fecha >= fechaActual) {
                fechas.push(fecha.toLocaleDateString('es-PE')); // Formato DD/MM/YYYY
            }
        }
        return fechas;
    };

    const fechasSemana = getFechasDeSemana();

    const handleFechaChange = (index) => {
        setFechaSeleccionada(fechasSemana[index]);
        setFecha(fechasSemana[index]); // Guardar la fecha seleccionada en el estado principal
    };

    // Función para manejar la selección y deselección de horarios
    const handleHorarioSelect = (hora, dia) => {
        if (isHorarioPasado(hora)) return; // No permitir selección si ya pasó el horario
        setHorarioSeleccionado({ hora, dia });
        setConfirmarSeleccion(true); // Mostrar el mensaje de confirmación
    };

    const confirmarHorario = (confirmado) => {
        if (confirmado) {
            // Si el usuario confirma, marcar el horario seleccionado
            const key = `${horarioSeleccionado.dia}_${horarioSeleccionado.hora}`;
            setHorariosMarcados((prevState) => ({ ...prevState, [key]: true }));
            setHora(horarioSeleccionado.hora); // Guardar la hora seleccionada
        } else {
            // Si el usuario no confirma, desmarcar la selección
            setHorarioSeleccionado(null);
        }
        setConfirmarSeleccion(false); // Ocultar el mensaje de confirmación
    };

    // Función para verificar si un horario ya pasó
    const isHorarioPasado = (hora) => {
        const [horaPart, minutoPart] = hora.split(':');
        const ahora = new Date();
        const horaActual = ahora.getHours();
        const minutosActuales = ahora.getMinutes();

        if (parseInt(horaPart) < horaActual || (parseInt(horaPart) === horaActual && parseInt(minutoPart) < minutosActuales)) {
            return true; // Ya pasó la hora
        }
        return false; // Aún está disponible
    };

    const horas = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    // Desplazar los días hacia adelante o atrás
    const handleDeslizar = (direccion) => {
        if (direccion === "izquierda" && diasDeslizados > -30) {
            setDiasDeslizados(diasDeslizados - 1);
        }
        if (direccion === "derecha" && diasDeslizados < 30) {
            setDiasDeslizados(diasDeslizados + 1);
        }
    };

    return (
        <div className="step3-container">
            <h2>Reservar Cita - {nombre} {apellidoPaterno} - {sede}</h2>
            <p>¡Es muy fácil! Puedes reservar tu cita seleccionando la fecha y hora.</p>

            {/* Controles para deslizar el calendario */}
            <div className="deslizar-container">
                <button onClick={() => handleDeslizar("izquierda")} className="deslizar-btn">{"<"}</button>
                <span>Calendario</span>
                <button onClick={() => handleDeslizar("derecha")} className="deslizar-btn">{">"}</button>
            </div>

            {/* Cuadrante de Horarios */}
            <div className="horarios-cuadrante">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            {fechasSemana.map((fecha, index) => (
                                <th key={index} className="border p-4">{fecha}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {horas.map((hora, index) => (
                            <tr key={index}>
                                {fechasSemana.map((fecha, diaIndex) => (
                                    <td
                                        key={diaIndex}
                                        className={`p-3 cursor-pointer border text-center 
                                            ${horariosMarcados[`${fecha}_${hora}`] ? 'bg-green-500' : ''} 
                                            ${isHorarioPasado(hora) ? 'bg-red-500 text-white' : ''}
                                        `}
                                        onClick={() => handleHorarioSelect(hora, fecha)}
                                    >
                                        {hora} 
                                        {horariosMarcados[`${fecha}_${hora}`] && <span className="text-white">✓</span>}
                                        {isHorarioPasado(hora) && <span className="text-white">✖</span>}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mensaje de Confirmación */}
            {confirmarSeleccion && (
                <div className="confirmar-mensaje">
                    <p>¿Estás seguro de elegir este horario?</p>
                    <button onClick={() => confirmarHorario(true)} className="btn btn-success">Sí</button>
                    <button onClick={() => confirmarHorario(false)} className="btn btn-danger">No</button>
                </div>
            )}

            {/* Selección de Doctor */}
            {horarioSeleccionado && (
                <>
                    <label>Seleccione un doctor:</label>
                    <select onChange={(e) => setDoctorSeleccionado(e.target.value)} value={doctorSeleccionado || ''}>
                        <option value="">Seleccione un doctor</option>
                        {doctoresDisponibles.map((doctor, index) => (
                            <option key={index} value={doctor}>{doctor}</option>
                        ))}
                    </select>
                </>
            )}
        </div>
    );
};

export default Step3;


