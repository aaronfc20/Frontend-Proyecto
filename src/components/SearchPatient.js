import React, { useState } from 'react';
import axios from 'axios';
import './SearchPatient.module.css';

const SearchPatient = () => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [dni, setDni] = useState('');
    const [edad, setEdad] = useState('');
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [noPatientMessage, setNoPatientMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setNoPatientMessage('');

        if (!dni && !nombreCompleto) {
            setErrorMessage('Se necesita completar el campo de nombre completo o DNI para realizar la búsqueda.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5000/patients/search', {
                params: { nombreCompleto, dni },
            });
            setPatients(response.data);
            setFilteredPatients(response.data);

            if (response.data.length === 0) {
                setNoPatientMessage('No se encontraron pacientes con esos datos.');
            } else {
                setNoPatientMessage('');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Hubo un error al realizar la búsqueda.');
        }
    };

    const filterPatientsByAge = () => {
        const ageNum = parseInt(edad, 10);
        if (!isNaN(ageNum)) {
            const filtered = patients.filter(patient => {
                const patientAge = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
                return patientAge === ageNum;
            });
            setFilteredPatients(filtered);
            if (filtered.length === 0) {
                setNoPatientMessage('No se encontraron pacientes con esa edad.');
            } else {
                setNoPatientMessage('');
            }
        } else {
            setFilteredPatients(patients);
        }
    };

    return (
        <div className="search-container">
            <h2>Buscar Paciente</h2>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>DNI (opcional)</label>
                    <input
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Edad (opcional)</label>
                    <input
                        type="number"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                    />
                </div>
                <button type="submit">Buscar Paciente</button>
            </form>
            <button onClick={filterPatientsByAge}>Filtrar por Edad</button>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {noPatientMessage && <div className="no-patient-message">{noPatientMessage}</div>}
            {filteredPatients.length > 0 && (
                <div className="patient-details">
                    <h3>Detalles del Paciente:</h3>
                    {filteredPatients.map((patient) => (
                        <div key={patient._id}>
                            <p><strong>Nombre Completo:</strong> {patient.nombreCompleto}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                            <p><strong>Médico:</strong> {patient.doctor}</p>
                            <p><strong>Especialidad:</strong> {patient.specialty}</p>
                            <p><strong>Diagnóstico:</strong> {patient.diagnosis}</p>
                            <p><strong>Tratamiento:</strong> {patient.treatment}</p>
                            <p><strong>DNI:</strong> {patient.dni}</p>
                            <button onClick={() => navigate(`/edit/${patient._id}`)}>Editar Información</button>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPatient;
