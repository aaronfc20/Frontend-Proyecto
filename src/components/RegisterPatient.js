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
            await axios.post('http://localhost:3001/patients', formData);
            alert('Paciente registrado exitosamente.');
            navigate('/');
        } catch (error) {
            console.error('Error al registrar el paciente:', error); // Agregar este console.error
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Error al registrar el paciente';
            alert(errorMessage);
        }
    };
    

    return (
        <div className="form-container">
            <h2 className="register-title">Registrar Paciente</h2>
            <form onSubmit={handleSubmit}>
                <div className="register-form-group">
                    <label className="register-label">DNI</label>
                    <input
                        type="text"
                        name="dni"
                        className="register-input"
                        placeholder="Ingrese el DNI"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Nombre Completo</label>
                    <input
                        type="text"
                        name="nombreCompleto"
                        className="register-input"
                        placeholder="Ingrese el nombre completo"
                        value={formData.nombreCompleto}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        className="register-input"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Médico de Cabecera</label>
                    <input
                        type="text"
                        name="doctor"
                        className="register-input"
                        placeholder="Ingrese el médico de cabecera"
                        value={formData.doctor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Especialidad</label>
                    <input
                        type="text"
                        name="specialty"
                        className="register-input"
                        placeholder="Ingrese la especialidad"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Diagnóstico</label>
                    <textarea
                        name="diagnosis"
                        className="register-textarea"
                        placeholder="Ingrese el diagnóstico"
                        value={formData.diagnosis}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Tratamiento</label>
                    <textarea
                        name="treatment"
                        className="register-textarea"
                        placeholder="Ingrese el tratamiento"
                        value={formData.treatment}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterPatient;
