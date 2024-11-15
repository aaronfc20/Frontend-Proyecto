import React from 'react';

const Step4 = ({ 
  nombre, 
  apellidoPaterno, 
  sede, 
  doctorSeleccionado, 
  fecha, 
  hora, 
  seguroSeleccionado, 
  tipoSeguro, 
  setStep 
}) => {

  const handleIrPaso5 = () => {
    setStep(5); // Cambiar el paso a 5 para mostrar el paso 5 (pago online)
  };

  return (
    <div className="step4-container">
      <h2>Detalles de la Cita Médica</h2>

      <div className="detalles-cita">
        <p><strong>Nombre:</strong> {nombre} {apellidoPaterno}</p>
        <p><strong>Sede:</strong> {sede}</p>
        <p><strong>Doctor:</strong> {doctorSeleccionado}</p>
        <p><strong>Fecha de Atención:</strong> {fecha}</p>
        <p><strong>Hora de Atención:</strong> {hora}</p>

        <div>
          <strong>¿Cuentas con seguro?</strong>
          {seguroSeleccionado ? (
            <>
              <p><strong>Tipo de seguro:</strong> {tipoSeguro}</p>
            </>
          ) : (
            <p>No cuentas con seguro.</p>
          )}
        </div>
      </div>

      <div className="boton-paso5">
        <button onClick={handleIrPaso5} className="btn btn-primary">
          Ir a Pagar
        </button>
      </div>
    </div>
  );
};

export default Step4;


