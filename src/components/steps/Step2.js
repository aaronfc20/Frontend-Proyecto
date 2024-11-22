import React, { useState } from 'react';
import './step2.css';

const Step2 = ({
    nombre,
    apellidoPaterno,
    sede,
    setEspecialidad,
    setModoAtencion,
    setTipoSeguro,
    isTeleconsulta, // Propiedad adicional para identificar el tipo de cita
}) => {
    const [mostrarSelectSeguro, setMostrarSelectSeguro] = useState(false);
    const [botonSeleccionado, setBotonSeleccionado] = useState(''); // Estado para controlar el botón seleccionado

    const handleSeguroClick = (tipoSeguro) => {
        setBotonSeleccionado(tipoSeguro); // Actualizar el botón seleccionado
        if (tipoSeguro === 'conSeguro') {
            setMostrarSelectSeguro(true);
            setModoAtencion('conSeguro'); // Actualizar modo de atención
        } else {
            setMostrarSelectSeguro(false);
            setModoAtencion('particular'); // Actualizar modo de atención
            setTipoSeguro(''); // Limpiar el tipo de seguro si es particular
        }
    };

    const handleTipoSeguroChange = (e) => {
        setTipoSeguro(e.target.value); // Actualizar el tipo de seguro en el estado principal
    };

    const handleEspecialidadChange = (e) => {
        setEspecialidad(e.target.value); // Actualizar la especialidad en el componente principal
    };

    return (
        <div className="step2-container">
            <h2>
                Reservar Cita - {nombre} {apellidoPaterno}{' '}
                {!isTeleconsulta && `- ${sede}`}
            </h2>

            <div className="stepper">
                <div className="step">Paso 1</div>
                <div className="step active">Paso 2</div>
                <div className="step">Paso 3</div>
                <div className="step">Paso 4</div>
                <div className="step">Paso 5</div>
            </div>

            <p>¿Cuenta con seguro?</p>
            <div className="seguro-buttons">
                <button
                    onClick={() => handleSeguroClick('conSeguro')}
                    className={botonSeleccionado === 'conSeguro' ? 'boton-activo' : ''}
                >
                    SÍ, CUENTO CON SEGURO
                </button>
                <button
                    onClick={() => handleSeguroClick('particular')}
                    className={botonSeleccionado === 'particular' ? 'boton-activo' : ''}
                >
                    PARTICULAR
                </button>
            </div>

            {mostrarSelectSeguro && (
                <div className="select-seguro">
                    <label htmlFor="seguro-select">Seleccione su seguro:</label>
                    <select id="seguro-select" onChange={handleTipoSeguroChange}>
                        <option value="">Seleccione un seguro</option>
                        <option value="Essalud">Essalud</option>
                        <option value="Rímac">Rímac</option>
                        <option value="Pacífico">Pacífico</option>
                        <option value="Mapfre">Mapfre</option>
                        <option value="Sanitas">Sanitas</option>
                    </select>
                </div>
            )}

            <hr className="separador" />

            <label htmlFor="especialidad-select">Elige tu Especialidad:</label>
            <select id="especialidad-select" onChange={handleEspecialidadChange}>
                <option value="">Seleccione una especialidad</option>
                <option value="Medicina General">Medicina General</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Neurología">Neurología</option>
            </select>
        </div>
    );
};

export default Step2;
