import React, { useState, useEffect } from 'react';
import './step3.css';

const Step3 = ({ nombre, apellidoPaterno, sede, especialidad, citasExistentes, setDoctor, setFecha, setHora }) => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [doctoresDisponibles, setDoctoresDisponibles] = useState([]);
    const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
    const [horariosMarcados, setHorariosMarcados] = useState({});
    const [fechaActual, setFechaActual] = useState(new Date());
    const [diasDeslizados, setDiasDeslizados] = useState(0);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
    const [confirmarSeleccion, setConfirmarSeleccion] = useState(false);
    const [confirmarDesmarcar, setConfirmarDesmarcar] = useState(false);

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

    const getFechasDeSemana = () => {
        let fechas = [];
        let fechaInicioSemana = new Date(fechaActual);
        fechaInicioSemana.setDate(fechaInicioSemana.getDate() + diasDeslizados);

        for (let i = 0; i < 5; i++) {
            const fecha = new Date(fechaInicioSemana);
            fecha.setDate(fecha.getDate() + i);
            if (fecha >= fechaActual) {
                fechas.push(fecha.toLocaleDateString('es-PE'));
            }
        }
        return fechas;
    };

    const fechasSemana = getFechasDeSemana();

    const handleFechaChange = (index) => {
        setFechaSeleccionada(fechasSemana[index]);
        setFecha(fechasSemana[index]);
    };

    const handleHorarioSelect = (hora, dia) => {
        if (isHorarioPasado(hora, dia)) return;

        const key = `${dia}_${hora}`;
        if (horariosMarcados[key]) {
            // Si el horario ya está marcado, mostramos la confirmación para desmarcarlo
            setHorarioSeleccionado({ hora, dia });
            setConfirmarDesmarcar(true);
        } else {
            setHorarioSeleccionado({ hora, dia });
            setConfirmarSeleccion(true);
        }
    };

    const confirmarHorario = (confirmado) => {
        if (confirmado) {
            const key = `${horarioSeleccionado.dia}_${horarioSeleccionado.hora}`;
            setHorariosMarcados((prevState) => ({ ...prevState, [key]: true }));
            setHora(horarioSeleccionado.hora);
        } else {
            setHorarioSeleccionado(null);
        }
        setConfirmarSeleccion(false);
    };

    const confirmarDesmarcarHorario = (confirmado) => {
        if (confirmado) {
            const key = `${horarioSeleccionado.dia}_${horarioSeleccionado.hora}`;
            setHorariosMarcados((prevState) => {
                const updated = { ...prevState };
                delete updated[key]; // Eliminar el horario marcado
                return updated;
            });
        } else {
            setHorarioSeleccionado(null);
        }
        setConfirmarDesmarcar(false);
    };

    const isHorarioPasado = (hora, dia) => {
        const [horaPart, minutoPart] = hora.split(':');
        const ahora = new Date();
        const horaActual = ahora.getHours();
        const minutosActuales = ahora.getMinutes();
        const [diaPart, mesPart, anioPart] = dia.split('/');
        const fechaSeleccionada = new Date(`${anioPart}-${mesPart}-${diaPart}T${horaPart}:${minutoPart}:00`);

        // Compara si la fecha seleccionada ya pasó respecto a la fecha y hora actuales
        if (fechaSeleccionada < ahora) {
            return true;
        }

        return false;
    };

    const horas = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

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

            <div className="deslizar-container">
                <button onClick={() => handleDeslizar("izquierda")} className="deslizar-btn">{"<"}</button>
                <span>Calendario</span>
                <button onClick={() => handleDeslizar("derecha")} className="deslizar-btn">{">"}</button>
            </div>

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
                                            ${isHorarioPasado(hora, fecha) ? 'bg-red-500 text-white' : ''}
                                        `}
                                        onClick={() => handleHorarioSelect(hora, fecha)}
                                    >
                                        {hora} 
                                        {horariosMarcados[`${fecha}_${hora}`] && <span className="text-white">✓</span>}
                                        {isHorarioPasado(hora, fecha) && <span className="text-white">✖</span>}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {confirmarSeleccion && (
                <div className="confirmar-mensaje">
                    <p>¿Estás seguro de elegir este horario?</p>
                    <button onClick={() => confirmarHorario(true)} className="btn btn-success">Sí</button>
                    <button onClick={() => confirmarHorario(false)} className="btn btn-danger">No</button>
                </div>
            )}

            {confirmarDesmarcar && (
                <div className="confirmar-mensaje">
                    <p>¿Estás seguro de que no quieres este horario?</p>
                    <button onClick={() => confirmarDesmarcarHorario(true)} className="btn btn-success">Sí</button>
                    <button onClick={() => confirmarDesmarcarHorario(false)} className="btn btn-danger">No</button>
                </div>
            )}

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


