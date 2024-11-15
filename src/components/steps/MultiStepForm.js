import React, { useState } from 'react';
import Step4 from './Step4';
import Step5 from './Step5';

const MultiStepForm = () => {
  const [step, setStep] = useState(4); // Comenzamos en el paso 4

  const [nombre] = useState('Juan');
  const [apellidoPaterno] = useState('Perez');
  const [sede] = useState('Sede Lima');
  const [doctorSeleccionado] = useState('Dr. López');
  const [fecha] = useState('2024-11-20');
  const [hora] = useState('10:00 AM');
  const [seguroSeleccionado] = useState(true);
  const [tipoSeguro] = useState('Essalud');

  return (
    <div>
      {step === 4 && (
        <Step4
          nombre={nombre}
          apellidoPaterno={apellidoPaterno}
          sede={sede}
          doctorSeleccionado={doctorSeleccionado}
          fecha={fecha}
          hora={hora}
          seguroSeleccionado={seguroSeleccionado}
          tipoSeguro={tipoSeguro}
          setStep={setStep} // Permite cambiar de paso
        />
      )}

      {step === 5 && <Step5 setStep={setStep} />} {/* Mostrar el Paso 5 cuando el paso es 5 */}
    </div>
  );
};

export default MultiStepForm;
