import React, { useState, useEffect } from 'react';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';

import './reservarteleconsulta.css';

const ReservarTeleconsulta = () => {
    const [currentStep, setCurrentStep] = useState(1); // Inicia en el paso 2
    const [userData, setUserData] = useState({
        nombre: '',
        apellidoPaterno: '',
        genero: 'No especificado',
        fechaNacimiento: '',
        peso: 'No especificado',
        altura: 'No especificado',
        tipoSangre: 'No especificado',
    });
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
                tipoSangre: user.tipoSangre || 'No especificado',
            });
        }
    }, []);

    const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
    const handlePrevStep = () => setCurrentStep((prevStep) => prevStep - 1);

    const handleFinish = () => {
        alert('Gracias, teleconsulta reservada.');
        window.location.href = '/';
    };

    return (
        <div className="reservar-teleconsulta-container">
            {currentStep === 1 && (
                <Step2
                    nombre={userData.nombre}
                    apellidoPaterno={userData.apellidoPaterno}
                    setEspecialidad={setEspecialidad}
                    setModoAtencion={setModoAtencion}
                    setTipoSeguro={setTipoSeguro}
                    isTeleconsulta={true} // Teleconsulta
                />
            )}
            {currentStep === 2 && (
                <Step3
                    especialidad={especialidad}
                    setDoctor={setDoctor}
                    setFecha={setFecha}
                    setHora={setHora}
                    tipoCita="teleconsulta"
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
                    tipoSeguro={tipoSeguro}
                    isTeleconsulta={true} // Teleconsulta
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
                    tipoSeguro={tipoSeguro}
                    handleFinish={handleFinish}
                />
            )}
            <div className="step-buttons">
                {currentStep > 1 && (
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

export default ReservarTeleconsulta;
