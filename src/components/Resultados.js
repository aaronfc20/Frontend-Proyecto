import React, { useEffect, useState } from "react"; 
import axios from "axios";
import "./resultados.css"; // Archivo CSS para estilos

function Resultados() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/test-de-presion/resultados")
      .then((response) => {
        setTests(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los resultados:", error);
      });
  }, []);

  return (
    <div className="resultados-container">
      <h1 className="resultados-title">Resultados del Test de Depresión</h1>
     
      <h2 className="resultados-subtitle">Detalles de los Tests</h2>
      {tests.length === 0 ? (
        <p className="resultados-empty">No se han encontrado resultados.</p>
      ) : (
        tests.map((test, index) => (
          <div key={index} className="resultados-item">
            <p>
              <strong>Fecha y Hora:</strong> {new Date(test.fecha).toLocaleString()}
            </p>
            <p>
              <strong>Probabilidad de depresión:</strong> {test.probabilidadDepresion}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Resultados;
