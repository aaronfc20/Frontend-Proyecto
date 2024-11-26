import React, { useEffect, useState } from "react";
import axios from "axios";


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
    <div>
      <h1>Resultados del Test de Depresión</h1>
     
      <h2>Detalles de los Tests</h2>
      {tests.length === 0 ? (
        <p>No se han encontrado resultados.</p>
      ) : (
        tests.map((test, index) => (
          <div key={index}>
            <p><strong>Fecha y Hora:</strong> {new Date(test.fecha).toLocaleString()}</p>
            <p><strong>Probabilidad de depresión:</strong> {test.probabilidadDepresion}</p>
          </div>
        ))
      )}
    </div>
  );
}


export default Resultados;





