import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import './encuestaSatisfaccion.css';

const EncuestaSatisfaccion = ({ citaId, onSubmitFeedback }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = () => {
        if (rating === 0) {
            alert('Por favor, selecciona una calificación.');
            return;
        }

        // Llamada a la función para enviar el feedback
        onSubmitFeedback(citaId, { rating, feedback });
        setRating(0);
        setFeedback('');
    };

    return (
        <div className="encuesta-container">
            <h3>Encuesta de Satisfacción</h3>
            <p>Califica tu experiencia con esta cita:</p>
            <ReactStars
                count={5}
                onChange={handleRatingChange}
                size={30}
                activeColor="#ffd700"
                value={rating}
            />
            <textarea
                placeholder="Deja un comentario (opcional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            />
            <button onClick={handleSubmit} className="submit-button">
                Enviar
            </button>
        </div>
    );
};

export default EncuestaSatisfaccion;
