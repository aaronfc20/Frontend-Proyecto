import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // Importa FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Vista mensual
import timeGridPlugin from '@fullcalendar/timegrid'; // Vista semanal/diaria
import interactionPlugin from '@fullcalendar/interaction'; // Eventos de clic
import { useParams } from 'react-router-dom'; // Para obtener los parámetros de la URL
import './Calendario.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import { Modal, Button } from 'react-bootstrap'; // Componentes de Bootstrap

const Calendario = () => {
    const { userId } = useParams(); // Obtener el doctorId de la URL
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal

    // Cargar eventos desde la API con el doctorId
    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3001/citas/todas/${userId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) { // Nueva condición: verificar si hay citas disponibles
                        alert('No hay citas disponibles.');
                        setEvents([]); // Asegurarnos de que el calendario no tenga eventos
                    } else {
                        const formattedEvents = data.map(cita => ({
                            id: cita.id,
                            title: `${cita.paciente.nombreCompleto}`,
                            start: `${cita.fecha}T${cita.hora}`,
                            end: `${cita.fecha}T${cita.horaFin}` // Ajustar según los datos
                        }));
                        setEvents(formattedEvents);
                    }
                })
                .catch(error => console.error('Error al cargar las citas:', error));
        }
    }, [userId]); // Dependencia de userId para cargar eventos solo cuando cambie

    // Manejar clic en un evento
    const handleEventClick = (info) => {
        setSelectedEvent({
            title: info.event.title,
            start: info.event.start.toISOString()
        });
        setShowModal(true); // Mostrar el modal
    };

    // Cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    return (
        <div>
            <h1>Calendario de Citas</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                selectable={true}
                editable={true}
                eventClick={handleEventClick} // Manejar el clic en un evento
            />

            {/* Modal de Bootstrap */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la Cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <>
                            <p><strong>Paciente:</strong> {selectedEvent.title}</p>
                            <p><strong>Hora de Inicio:</strong> {new Date(selectedEvent.start).toLocaleTimeString()}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Calendario;
