import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editPatient.css';

const EditPatient = () => {
    const { id } = useParams(); // Obtener el id del paciente desde la URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dni: '',
        nombreCompleto: '',
        dateOfBirth: '',
        doctor: '',
        specialty: '',
        diagnosis: '',
        treatment: ''
    });

    useEffect(() => {
        // Obtener los datos del paciente al cargar el componente
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/patients/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del paciente:', error);
            }
        };
        fetchPatientData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/patients/${id}`, formData);
            alert('Paciente actualizado exitosamente.');
            navigate('/dashboard-doctor/search');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al actualizar el paciente.';
            alert(errorMessage);
        }
    };

    return (
        <div className='edit-patient-background'>
            <div className="edit-patient-container">
                <h2>Editar Información del Paciente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>DNI</label>
                        <input
                            type="text"
                            name="dni"
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
                            value={formData.specialty}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Diagnóstico</label>
                        <textarea
                            name="diagnosis"
                            value={formData.diagnosis}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tratamiento</label>
                        <textarea
                            name="treatment"
                            value={formData.treatment}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Actualizar</button>
                </form>
            </div>
        </div>
    );
};

export default EditPatient;
