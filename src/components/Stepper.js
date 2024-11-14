// Stepper.js
import React from 'react';
import './stepper.css'; // CSS específico para el estilo del Stepper

const Stepper = ({ currentStep }) => {
    const steps = [
        { label: 'Paso 1', icon: '👤', description: 'Seleccione sede' },
        { label: 'Paso 2', icon: '📄', description: 'Seleccione especialidad' },
        { label: 'Paso 3', icon: '👥', description: 'Elegir Médico' },
        { label: 'Paso 4', icon: '📅', description: 'Confirmar Cita' },
        { label: 'Paso 5', icon: '✔️', description: 'Confirmación' }
    ];

    return (
        <div className="stepper-container">
            {steps.map((step, index) => (
                <div key={index} className={`step ${index <= currentStep ? 'active' : ''}`}>
                    <div className="step-icon">{step.icon}</div>
                    {index === currentStep && (
                        <div className="step-label">{step.description}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;
