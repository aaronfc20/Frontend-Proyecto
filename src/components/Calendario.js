import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // Importa FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Vista mensual
import timeGridPlugin from '@fullcalendar/timegrid'; // Vista semanal/diaria
import interactionPlugin from '@fullcalendar/interaction'; // Eventos de clic
import './Calendario.css';

const Calendar = () => {
    const [events, setEvents] = useState([]);

    // Cargar eventos desde la API
    useEffect(() => {
        fetch('http://localhost:3001/citas')
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) { // Nueva condición: verificar si hay citas disponibles
                    alert('No hay citas disponibles.');
                    setEvents([]); // Asegurarnos de que el calendario no tenga eventos
                } else {
                    const formattedEvents = data.map(cita => ({
                        id: cita.id,
                        title: `${cita.paciente.nombreCompleto} - ${cita.medico.nombre}`,
                        start: `${cita.fecha}T${cita.hora}`,
                        end: `${cita.fecha}T${cita.horaFin}` // Ajustar según los datos
                    }));
                    setEvents(formattedEvents);
                }
            })
            .catch(error => console.error('Error al cargar las citas:', error));
    }, []);

    return (
        <div>
            <h1>Calendario de Citas</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                selectable={true}
                editable={true}
                eventClick={(info) => alert(`Cita: ${info.event.title}`)}
            />
        </div>
    );
};

export default Calendar;
