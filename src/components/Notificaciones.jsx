import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notificaciones = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Simulación de obtención de datos desde la base de datos
    // const fetchCitas = async () => {
    //   const citasDB = [
    //     { nombre: 'Juan Pérez', motivo: 'Consulta médica', hora: '2024-10-05T17:42:00' },
    //     { nombre: 'Ana López', motivo: 'Reunión de trabajo', hora: '2024-10-05T17:43:00' }
    //   ];
    //   setCitas(citasDB);
    // };
    // Obtener datos de citas desde el backend
    const fetchCitas = async () => {
      try {
        const response = await fetch('http://localhost:3001/citas'); // Ruta del backend
        const data = await response.json();
        setCitas(data);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    };

    fetchCitas();
  }, []);

  // useEffect(() => {
  //   citas.forEach((cita) => {
  //     const now = new Date();
  //     const citaDate = new Date(cita.hora);

  //     // Calculamos el tiempo restante en milisegundos
  //     const timeToNotification = citaDate.getTime() - now.getTime();

  //     if (timeToNotification > 0) {
  //       setTimeout(() => {
  //         // Mostrar notificación
  //         toast.info(`Tienes una cita para ${cita.motivo} con ${cita.nombre}`);
  //       }, timeToNotification);
  //     }
  //   });
  // }, [citas]);
  useEffect(() => {
    citas.forEach((cita) => {
      const now = new Date();
      const fechaHoraCita = new Date(`${cita.fecha}T${cita.hora}`);

      // Calcula el tiempo restante en milisegundos
      const timeToNotification = fechaHoraCita.getTime() - now.getTime();

      if (timeToNotification > 0) {
        setTimeout(() => {
          // Mostrar notificación
          toast.info(`Tienes una cita con el paciente ID ${cita.pacienteId} a las ${cita.hora}`);
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

