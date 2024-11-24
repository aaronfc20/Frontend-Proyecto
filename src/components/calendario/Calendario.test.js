import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendario from './Calendario';
import { BrowserRouter as Router } from 'react-router-dom';

global.fetch = jest.fn();

const mockEvents = [
    {
        id: '1',
        paciente: { nombreCompleto: 'Juan Pérez' },
        fecha: '2024-11-25',
        hora: '10:00',
        horaFin: '11:00',
    },
    {
        id: '2',
        paciente: { nombreCompleto: 'María López' },
        fecha: '2024-11-26',
        hora: '14:00',
        horaFin: '15:00',
    },
];

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ userId: '123' }),
}));

describe('Calendario Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        fetch.mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockEvents),
            })
        );
    });

    it('should render calendar and load events', async () => {
        render(
            <Router>
                <Calendario />
            </Router>
        );

        // Verificar que se llamó a la API
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/citas/todas/123');

        // Verificar si los eventos se renderizan
        await waitFor(() => {
            expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
            expect(screen.getByText('María López')).toBeInTheDocument();
        });
    });

    it('should display modal with event details when event is clicked', async () => {
        render(
            <Router>
                <Calendario />
            </Router>
        );

        // Esperar a que se carguen los eventos
        const eventElement = await screen.findByText('Juan Pérez');

        // Simular clic en el evento
        fireEvent.click(eventElement);

        // Verificar si el modal se abre y muestra la información correcta
        await waitFor(() => {
            expect(screen.getByText('Detalles de la Cita')).toBeInTheDocument();
        });
    });

    it('should notify patient when notify button is clicked', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: 'Correo enviado correctamente' }),
            })
        );

        render(
            <Router>
                <Calendario />
            </Router>
        );

        // Cargar evento y simular clic
        const eventElement = await waitFor(() => {
          expect(screen.getByText('Juan Pérez')).toBeInTheDocument()});
        fireEvent.click(eventElement);

        // Simular clic en el botón de notificar
        const notifyButton = screen.getByText('Notificar al paciente');
        fireEvent.click(notifyButton);

        // Verificar que se realizó la solicitud al backend
        await waitFor(() => expect(fetch).toHaveBeenCalledWith('http://localhost:3001/citas/notificar/123', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }));

        // Verificar que se muestra el mensaje de éxito
        await waitFor(() => {
            expect(screen.getByText('Correo enviado correctamente')).toBeInTheDocument();
        });
    });

    it('should show alert if no events are available', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve([]), // Sin eventos
            })
        );

        // Simular window.alert
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <Router>
                <Calendario />
            </Router>
        );

        // Verificar que se muestra la alerta
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('No hay citas disponibles.');
        });

        alertMock.mockRestore(); // Restaurar el mock
    });
});
