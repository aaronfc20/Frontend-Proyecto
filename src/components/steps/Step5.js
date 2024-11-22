import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './step5.css';

const Step5 = ({
    nombre,
    apellidoPaterno,
    doctorSeleccionado,
    fechaSeleccionada,
    horaSeleccionada,
    especialidad,
    sede,
    tipoSeguro,
    handleFinish,
}) => {
    const [cardData, setCardData] = useState({
        cvc: '',
        expiry: '',
        name: '',
        number: '',
    });

    const [pacienteId, setPacienteId] = useState(null);

    useEffect(() => {
        // Obtener pacienteId del usuario logueado
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            setPacienteId(user.id); // Asegúrate de que el ID del usuario esté disponible
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    };

    // Función para guardar la cita en el backend
    const guardarCita = async (metodoPago) => {
        if (!pacienteId) {
            alert('No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.');
            return;
        }
    
        // Asegúrate de usar el ID del doctor
        const citaData = {
            pacienteId,
            doctorId: doctorSeleccionado.id, // Extraer solo el ID del doctor
            fecha: fechaSeleccionada,
            hora: horaSeleccionada,
            especialidad,
            sede,
            tipoSeguro,
            metodoPago,
        };
    
        console.log('Datos enviados al backend:', citaData);
    
        try {
            const response = await fetch('http://localhost:3001/citas/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(citaData),
            });
    
            if (response.ok) {
                alert('¡Cita guardada exitosamente!');
                handleFinish(); // Finalizar o redirigir según el flujo
            } else {
                const errorData = await response.json();
                console.error('Error al guardar la cita:', errorData);
                alert(`Hubo un problema al guardar la cita: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error en la conexión al backend:', error);
            alert('No se pudo conectar con el servidor. Por favor, revisa tu conexión.');
        }
    };
    

    const handlePayNow = () => guardarCita('pago_online');

    const handlePayLater = () => guardarCita('pago_dia_cita');

    return (
        <div className="step5-container">
            <h2>Información de Pago</h2>
            <p className="payment-info">
                ¡Paga en línea de manera fácil, rápida, segura y evita las colas!
                <br />
                Si tienes tarjeta de débito o crédito <strong>Visa, Mastercard o Diners</strong>, puedes hacer la transferencia a través de nuestro sistema de pagos.
            </p>
            <div className="payment-price">
                <h3>Precio</h3>
                <p>S/ 60.0</p>
            </div>
            <Cards
                cvc={cardData.cvc}
                expiry={cardData.expiry}
                name={cardData.name}
                number={cardData.number}
            />
            <form className="payment-form">
                <div className="form-group">
                    <label>Número de Tarjeta</label>
                    <input
                        type="text"
                        name="number"
                        value={cardData.number}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9101 1121"
                    />
                </div>
                <div className="form-group">
                    <label>Nombre en la Tarjeta</label>
                    <input
                        type="text"
                        name="name"
                        value={cardData.name}
                        onChange={handleInputChange}
                        placeholder="Nombre del titular"
                    />
                </div>
                <div className="form-group">
                    <label>Fecha de Expiración</label>
                    <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                    />
                </div>
                <div className="form-group">
                    <label>CVC</label>
                    <input
                        type="text"
                        name="cvc"
                        value={cardData.cvc}
                        onChange={handleInputChange}
                        placeholder="123"
                    />
                </div>
            </form>
            <div className="button-container">
                <button className="pay-now-button" onClick={handlePayNow}>
                    Reservar y Pagar Ahora
                </button>
                <button className="pay-later-button" onClick={handlePayLater}>
                    Reservar y Pagar el Día de la Cita
                </button>
            </div>
        </div>
        
    );
};

export default Step5;
