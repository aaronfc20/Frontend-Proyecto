import React, { useState, useEffect } from 'react';

import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';

import './reservarcitapresencial.css';

const ReservarCitaPresencial = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({
        nombre: '',
        apellidoPaterno: '',
        genero: 'No especificado',
        fechaNacimiento: '',
        peso: 'No especificado',
        altura: 'No especificado',
        tipoSangre: 'No especificado'
    });
    const [sede, setSede] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [doctor, setDoctor] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [modoAtencion, setModoAtencion] = useState('');
    const [tipoSeguro, setTipoSeguro] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserData({
                nombre: user.nombres || 'No especificado',
                apellidoPaterno: user.apellidoPaterno || 'No especificado',
                genero: user.genero || 'No especificado',
                fechaNacimiento: user.fechaNacimiento || '',
                peso: user.peso || 'No especificado',
                altura: user.altura || 'No especificado',
                tipoSangre: user.tipoSangre || 'No especificado'
            });
        }
    }, []);

    const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);

    const handlePrevStep = () => setCurrentStep((prevStep) => prevStep - 1);

    const handleFinish = () => {
        alert('Gracias, cita reservada.');
        window.location.href = '/';
    };

    return (
        <div className="reservar-cita-container">
            {currentStep === 0 && (
                <Step1
                    nombre={userData.nombre}
                    apellidoPaterno={userData.apellidoPaterno}
                    setSede={setSede}
                />
            )}
            {currentStep === 1 && (
                <Step2
                    nombre={userData.nombre}
                    apellidoPaterno={userData.apellidoPaterno}
                    sede={sede}
                    setEspecialidad={setEspecialidad}
                    setModoAtencion={setModoAtencion}
                    setTipoSeguro={setTipoSeguro}
                />
            )}
            {currentStep === 2 && (
                <Step3
                    sede={sede}
                    especialidad={especialidad}
                    setDoctor={setDoctor}
                    setFecha={setFecha}
                    setHora={setHora}
                />
            )}
            {currentStep === 3 && (
                <Step4
                    doctorSeleccionado={doctor}
                    fechaSeleccionada={fecha}
                    horaSeleccionada={hora}
                    nombre={userData.nombre}
                    apellidoPaterno={userData.apellidoPaterno}
                    especialidad={especialidad}
                    sede={sede}
                    tipoSeguro={tipoSeguro}
                />
            )}
            {currentStep === 4 && (
                <Step5
                    doctorSeleccionado={doctor}
                    fechaSeleccionada={fecha}
                    horaSeleccionada={hora}
                    nombre={userData.nombre}
                    apellidoPaterno={userData.apellidoPaterno}
                    especialidad={especialidad}
                    sede={sede}
                    tipoSeguro={tipoSeguro}
                    handleFinish={handleFinish}
                />
            )}
            <div className="step-buttons">
                {currentStep > 0 && (
                <button onClick={handlePrevStep} className="btn-prev">
                Anterior
                </button>
            )}
                {currentStep < 4 && (
                <button onClick={handleNextStep} className="btn-next">
                Siguiente
                </button>
            )}
                </div>
        </div>
    );
};

export default ReservarCitaPresencial;
