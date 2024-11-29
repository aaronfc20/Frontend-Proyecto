import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './EscogerPrueba.css';

// Importa las imágenes
import depresionImage from '../assets/depresion.jpg';
import ansiedadImage from '../assets/ansiedad.jpg';

function EscogerPrueba() {
  const navigate = useNavigate();

  useEffect(() => {
    // Añadir la clase al body
    document.body.classList.add('escoger-prueba-body');

    // Eliminar la clase al desmontar el componente
    return () => {
      document.body.classList.remove('escoger-prueba-body');
    };
  }, []);

  const handleDepressionTest = () => {
    navigate('/test-depresion');
  };

  const handleAnxietyTest = () => {
    alert('Redirigiendo al Test de Ansiedad...');
  };

  return (
    <div className="main-container">
      <h1 className="escoger-titulo">Elige el test psicológico que quieres realizar</h1>
      <div className="buttons-container">
        <button onClick={handleDepressionTest} className="test-button">
          <img
            src={depresionImage}
            alt="Icono Depresión"
            className="icon-depresion"
          />
          Test de Depresión
        </button>
        <button onClick={handleAnxietyTest} className="test-button">
          <img
            src={ansiedadImage}
            alt="Icono Ansiedad"
            className="icon-ansiedad"
          />
          Test de Ansiedad
        </button>
      </div>
      <div className="info">
        <h2 className="info-titulo">Test Psicológicos Online, Gratuitos Y Fiables</h2>
        <p className="info-texto">
          A diferencia de las pruebas de psicodiagnóstico (online o presenciales),
          que son tests psicométricos llevados a cabo por un psicólogo especializado,
          los tests de esta página son pruebas de cribado y autoevaluación, oficiales
          y validadas por la comunidad científica, y no tienen valor diagnóstico.
        </p>
      </div>
    </div>
  );
}

export default EscogerPrueba;
