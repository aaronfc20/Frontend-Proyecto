import React, { useContext, useState } from 'react';
import { NotasContext } from '../Context/NotasContext';
import './NotasRápidas.css';
import { motion } from 'framer-motion';

const NotasRapidas = () => {
    const { notas, agregarNota, eliminarNota } = useContext(NotasContext);
    const [nuevaNota, setNuevaNota] = useState('');

    const handleAgregarNota = () => {
        if (nuevaNota.trim() === '') return; 
        agregarNota(nuevaNota.trim());
        setNuevaNota('');
    };

    const descargarNotas = () => {
        const notasTexto = notas.join('\n');
        const blob = new Blob([notasTexto], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'notas_rapidas.txt';
        link.click();
    };

    return (
        <motion.div 
            className="notas-rapidas-container"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <h2>Notas Rápidas</h2>
            <div className="nueva-nota">
                <textarea
                    value={nuevaNota}
                    onChange={(e) => setNuevaNota(e.target.value)}
                    placeholder="Escribe una nota..."
                />
                <button onClick={handleAgregarNota}>Agregar Nota</button>
            </div>
            <div className="lista-notas">
                {notas.map((nota, index) => (
                    <div className="nota" key={index}>
                        <p>{nota}</p>
                        <button onClick={() => eliminarNota(index)}>Eliminar</button>
                    </div>
                ))}
            </div>
            <button className="descargar-button" onClick={descargarNotas}>
                Descargar Notas
            </button>
        </motion.div>
    );
};

export default NotasRapidas;
