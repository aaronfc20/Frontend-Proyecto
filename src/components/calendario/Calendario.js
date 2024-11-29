import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams } from 'react-router-dom';
import './Calendario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

import { motion } from 'framer-motion';


const Calendario = () => {
    const { userId } = useParams(); // Obtener el doctorId de la URL
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [notifying, setNotifying] = useState(false); // Estado para saber si estamos notificando

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
            start: info.event.start.toISOString(),
            id: info.event.id // Asegúrate de tener el ID del evento
        });
        setShowModal(true); // Mostrar el modal
    };

    // Cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    // Función para notificar al paciente (hacer un fetch al backend)
    const handleNotifyPatient = () => {
        if (selectedEvent) {
            setNotifying(true);

            // Realiza la petición al backend para enviar el correo
            fetch(`http://localhost:3001/citas/notificar/${selectedEvent.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setNotifying(false);
                    alert(data.message || 'Correo enviado correctamente');
                })
                .catch(error => {
                    setNotifying(false);
                    alert('Error al enviar el correo');
                    console.error('Error al notificar al paciente:', error);
                });
        }
    };

    return (
        <motion.div 
            className="componente-calendario"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div className="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    selectable={true}
                    editable={true}
                    eventClick={handleEventClick} // Manejar el clic en un evento
                />
            </div>

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
                            {/* Botón para notificar */}
                            <Button 
                                variant="primary" 
                                onClick={handleNotifyPatient} 
                                disabled={notifying} // Deshabilitar mientras se notifica
                            >
                                {notifying ? 'Notificando...' : 'Notificar al paciente'}
                            </Button>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </motion.div>
    );
};

export default Calendario;
