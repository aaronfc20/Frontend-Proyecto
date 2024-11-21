import React, { useState } from 'react';
import './step1.css';

const Step1 = ({ nombre, apellidoPaterno, setSede }) => {
    const [sedeSeleccionada, setSedeSeleccionada] = useState('');

    const handleSedeChange = (e) => {
        const nuevaSede = e.target.value;
        setSedeSeleccionada(nuevaSede);
        setSede(nuevaSede);
    };

    return (
        <div className="step1-container">
            <h2>
                Reservar Cita - {nombre || 'Usuario'} {apellidoPaterno || 'Anonimo'}
            </h2>
            <label htmlFor="sede-select">Seleccione la sede:</label>
            <select
                id="sede-select"
                value={sedeSeleccionada}
                onChange={handleSedeChange}
            >
                <option value="">Seleccione un distrito</option>
                <option value="Miraflores">Miraflores</option>
                <option value="San Isidro">San Isidro</option>
                <option value="Surco">Surco</option>
                <option value="San Borja">San Borja</option>
                <option value="La Molina">La Molina</option>
            </select>
        </div>
    );
};

export default Step1;
