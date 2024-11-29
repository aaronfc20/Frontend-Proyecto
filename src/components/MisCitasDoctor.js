import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MisCitasDoctor.css'; 
import { motion } from 'framer-motion';

const MisCitasDoctor = () => {
    const { userId } = useParams();
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await fetch(`http://localhost:3001/citas/todas/${userId}`);
                if (!response.ok) {
                    throw new Error('No se pudieron cargar las citas');
                }
                const data = await response.json();
                setCitas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCitas();
    }, [userId]);

    if (loading) return <p>Cargando citas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <motion.div 
            className="citas-container"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <h2>Mis Citas</h2>
            {citas.length > 0 ? (
                <div className="citas-list">
                    {citas.map(cita => (
                        <div className="cita-card" key={cita.id}>
                            <p><strong>Fecha:</strong> {cita.fecha}</p>
                            <p><strong>Hora:</strong> {cita.hora}</p>
                            <p><strong>Paciente:</strong> {cita.paciente ? cita.paciente.nombreCompleto : 'Desconocido'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes citas asignadas.</p>
            )}
        </motion.div>
    );
};

export default MisCitasDoctor;
