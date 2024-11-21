import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './step5.css';

const Step5 = () => {
    const [cardData, setCardData] = useState({
        cvc: '',
        expiry: '',
        name: '',
        number: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    };

    const handlePayNow = () => {
        alert('Pago realizado exitosamente');
        window.location.href = '/dashboard-usuario';
    };

    const handlePayLater = () => {
        alert('Gracias, cita reservada');
        window.location.href = '/dashboard-usuario';
    };

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
