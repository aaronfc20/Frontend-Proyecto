import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notificaciones = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Simulación de obtención de datos desde la base de datos
    const fetchCitas = async () => {
      const citasDB = [
        { nombre: 'Juan Pérez', motivo: 'Consulta médica', hora: '2024-10-05T17:42:00' },
        { nombre: 'Ana López', motivo: 'Reunión de trabajo', hora: '2024-10-05T17:43:00' }
      ];
      setCitas(citasDB);
    };

    fetchCitas();
  }, []);

  useEffect(() => {
    citas.forEach((cita) => {
      const now = new Date();
      const citaDate = new Date(cita.hora);

      // Calculamos el tiempo restante en milisegundos
      const timeToNotification = citaDate.getTime() - now.getTime();

      if (timeToNotification > 0) {
        setTimeout(() => {
          // Mostrar notificación
          toast.info(`Tienes una cita para ${cita.motivo} con ${cita.nombre}`);
        }, timeToNotification);
      }
    });
  }, [citas]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notificaciones;