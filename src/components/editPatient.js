import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPatient = () => {
    const { id } = useParams(); // Obtener el ID del paciente desde la URL
    const [patient, setPatient] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los detalles del paciente
        const fetchPatient = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/patients/${id}`);
                setPatient(res.data);
                setDiagnosis(res.data.diagnosis);
                setTreatment(res.data.treatment);
            } catch (error) {
                console.error('Error al obtener los datos del paciente:', error);
            }
        };

        fetchPatient();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // Enviar los datos actualizados al backend
            await axios.put(`http://localhost:5000/patients/${id}`, {
                diagnosis,
                treatment
            });

            setMessage('Información actualizada con éxito');
            setTimeout(() => navigate('/search'), 2000); // Redirigir a la página de búsqueda después de 2 segundos
        } catch (error) {
            console.error('Error al actualizar la información del paciente:', error);
            setMessage('Error al actualizar la información');
        }
    };

    if (!patient) return <p>Cargando...</p>;

    return (
        <div className="form-container">
            <h2>Editar Información del Paciente</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" value={patient.nombreCompleto} disabled />
                </div>
                <div className="form-group">
                    <label>Diagnóstico</label>
                    <textarea
                        name="diagnosis"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tratamiento</label>
                    <textarea
                        name="treatment"
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar Información</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditPatient;
