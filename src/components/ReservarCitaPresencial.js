// ReservarCitaPresencial.js
import React, { useState, useEffect } from 'react';


import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import './reservarcitapresencial.css';

const ReservarCitaPresencial = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({ nombre: '', apellidoPaterno: '' });
    const [sede, setSede] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [doctor, setDoctor] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [modoAtencion, setModoAtencion] = useState('');
    const [tipoSeguro, setTipoSeguro] = useState('');

    useEffect(() => {
        // Obtener los datos del usuario desde localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserData({
                nombre: user.nombre || 'No especificado',
                apellidoPaterno: user.apellidoPaterno || 'No especificado',
                genero: user.genero || 'No especificado',
                fechaNacimiento: user.fechaNacimiento || '',
                peso: user.peso || 'No especificado',
                altura: user.altura || 'No especificado',
                tipoSangre: user.tipoSangre || 'No especificado'
            });
        }
    }, []);
    
    

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
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
                    nombre={userData.nombre}
                    apellidoPaterno={userData.apellidoPaterno}
                    sede={sede}
                    especialidad={especialidad}
                    citasExistentes={[]} // Puedes agregar citas existentes aquí
                    setDoctor={setDoctor}
                    setFecha={setFecha}
                    setHora={setHora}
                />
            )}
            {currentStep === 3 && (
                <Step4
                    nombre={userData.nombre}
                    apellidoPaterno={userData.apellidoPaterno}
                    sede={sede}
                    especialidad={especialidad}
                    doctor={doctor}
                    fecha={fecha}
                    hora={hora}
                    modoAtencion={modoAtencion}
                    tipoSeguro={tipoSeguro}
                />
            )}
            <div className="step-buttons">
                {currentStep < 4 && (
                    <button onClick={handleNextStep}>Siguiente</button>
                )}
            </div>
        </div>
    );
};

export default ReservarCitaPresencial;