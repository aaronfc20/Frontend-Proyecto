import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TestDepresion.css";

const preguntas = [
  "Durante las últimas dos semanas, ¿con qué frecuencia has tenido poco interés o placer en hacer cosas?",
  "Durante las últimas dos semanas, ¿con qué frecuencia te has sentido deprimido(a) o sin esperanza?",
  "Durante las últimas dos semanas, ¿con qué frecuencia te has sentido fatigado(a) o sin energía?",
  "Durante las últimas dos semanas, ¿con qué frecuencia has tenido problemas para dormir o dormir demasiado?",
  "Durante las últimas dos semanas, ¿con qué frecuencia has tenido poco apetito o has comido en exceso?",
  "Durante las últimas dos semanas, ¿con qué frecuencia te has sentido mal contigo mismo(a), o sientes que eres un fracaso?",
  "Durante las últimas dos semanas, ¿con qué frecuencia has tenido pensamientos de que estarías mejor muerto(a) o de hacerte daño?"
];

function TestDePresion() {
  const [respuestas, setRespuestas] = useState(new Array(7).fill("Ningún día"));
  const navigate = useNavigate();  // Hook para redirigir

  const handleRespuestaChange = (index, value) => {
    const newRespuestas = [...respuestas];
    newRespuestas[index] = value;
    setRespuestas(newRespuestas);
  };

  const handleGuardar = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/test-de-presion/guardar", {
        respuestas: respuestas
      });
      alert("Test guardado exitosamente.");
      navigate("/resultados");  // Redirige a la página de resultados después de guardar
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el test.");
    }
  };

  const handleVerResultados = () => {
    navigate("/resultados");  // Redirige a los resultados sin guardar
  };

  return (
    <div className="test-container">
    <h1 className="test-title">Test de Depresión</h1>
      <form className="test-form">
        {preguntas.map((pregunta, index) => (
          <div key={index} className="test-question-container">
            <p className="test-question">{pregunta}</p>
            <select
              className="test-select"
              onChange={(e) => handleRespuestaChange(index, e.target.value)}
              value={respuestas[index]}
            >
              <option value="Ningún día">Ningún día</option>
              <option value="Varios días">Varios días</option>
              <option value="Más de la mitad de los días">
                Más de la mitad de los días
              </option>
              <option value="Casi todos los días">Casi todos los días</option>
            </select>
          </div>
        ))}
        <div className="test-buttons-container">
          <button
            type="button"
            onClick={handleGuardar}
            className="test-button"
          >
            Guardar resultados
          </button>
          <button
            type="button"
            onClick={handleVerResultados}
            className="test-button"
          >
            Ver resultados
          </button>
        </div>
      </form>
  </div>

  );
}

export default TestDePresion;
