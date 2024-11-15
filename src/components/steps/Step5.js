import React, { useState } from 'react';

const Step5 = ({ setStep }) => {
  const [metodoPago, setMetodoPago] = useState('');
  const [monto, setMonto] = useState('100'); // Ejemplo de monto fijo

  const handlePago = () => {
    // Aquí puedes integrar la lógica de pago o redirigir a una plataforma de pago real
    alert('Pago realizado exitosamente');
    setStep(6); // Cambiar a un paso siguiente, como confirmación del pago
  };

  return (
    <div className="step5-container">
      <h2>Pago Online</h2>

      <div className="pago-form">
        <p><strong>Monto a pagar: </strong>${monto}</p>

        <div className="metodo-pago">
          <label>Seleccione su método de pago:</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            className="form-control"
          >
            <option value="">Seleccionar</option>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="Transferencia Bancaria">Transferencia Bancaria</option>
            <option value="Paypal">Paypal</option>
          </select>
        </div>

        <div className="boton-pago">
          <button onClick={handlePago} className="btn btn-success">
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5;
