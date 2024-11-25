import { useNavigate } from 'react-router-dom';
import React from "react";
import "./EscogerPrueba.css";

function EscogerPrueba() {
  const navigate = useNavigate();  // Hook para redirigir

  const handleDepressionTest = () => {
    navigate("/test-depresion");  // Redirige al test de depresión
  };

  const handleAnxietyTest = () => {
    alert("Redirigiendo al Test de Ansiedad...");
  };

  return (
    <div className="EscogerPrueba">
      <header className="EscogerPrueba-header">
        <h1>Elige el test psicológico que quieres realizar</h1>
        <div className="buttons-container">
          <button onClick={handleDepressionTest} className="test-button">
            <img
              src="https://via.placeholder.com/50"
              alt="Icono Depresión"
              className="icon"
            />
            Test de Depresión
          </button>
          <button onClick={handleAnxietyTest} className="test-button">
            <img
              src="https://via.placeholder.com/50"
              alt="Icono Ansiedad"
              className="icon"
            />
            Test de Ansiedad
          </button>
        </div>
        <section className="info">
          <h2>Test psicológicos online, gratuitos y fiables</h2>
          <p>
            A diferencia de las pruebas de psicodiagnóstico (online o
            presenciales), que son tests psicométricos llevados a cabo por un
            psicólogo especializado, los tests de esta página son pruebas de
            cribado y autoevaluación, oficiales y validadas por la comunidad
            científica, y no tienen valor diagnóstico.
          </p>
        </section>
      </header>
    </div>
  );
}

export default EscogerPrueba;
