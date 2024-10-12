import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPatient.css'; // Importa el archivo CSS

const RegisterPatient = () => {
    const [formData, setFormData] = useState({
        dni: '',
        nombreCompleto: '',
        dateOfBirth: '',
        doctor: '',
        specialty: '',
        diagnosis: '',
        treatment: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/patients', formData);
            alert('Paciente registrado exitosamente.');
            navigate('/');
        } catch (error) {
            alert('Error al registrar el paciente: ' + error.response.data.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Registrar Paciente</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>DNI</label>
                    <input
                        type="text"
                        name="dni"
                        placeholder="Ingrese el DNI"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        name="nombreCompleto"
                        placeholder="Ingrese el nombre completo"
                        value={formData.nombreCompleto}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Médico de Cabecera</label>
                    <input
                        type="text"
                        name="doctor"
                        placeholder="Ingrese el médico de cabecera"
                        value={formData.doctor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Especialidad</label>
                    <input
                        type="text"
                        name="specialty"
                        placeholder="Ingrese la especialidad"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Diagnóstico</label>
                    <textarea
                        name="diagnosis"
                        placeholder="Ingrese el diagnóstico"
                        value={formData.diagnosis}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tratamiento</label>
                    <textarea
                        name="treatment"
                        placeholder="Ingrese el tratamiento"
                        value={formData.treatment}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterPatient;

