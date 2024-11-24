import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el userId de la URL
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notificaciones = () => {
  const { userId } = useParams(); // Obtener el userId desde la URL
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Función para obtener las citas del doctor según el userId
    const fetchCitas = async () => {
      try {
        // Cambiar la URL de la API para incluir el userId
        const response = await fetch(`http://localhost:3001/citas/todas/${userId}`);
        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        const data = await response.json();
        setCitas(data);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    };

    // Llamar a la función si userId existe
    if (userId) {
      fetchCitas();
    }
  }, [userId]);

  useEffect(() => {
    citas.forEach((cita) => {
      const now = new Date();
      const fechaHoraCita = new Date(`${cita.fecha}T${cita.hora}`);

      // Calcula el tiempo restante en milisegundos
      const timeToNotification = fechaHoraCita.getTime() - now.getTime();

      if (timeToNotification > 0) {
        // Crear una notificación para cada cita en el futuro
        setTimeout(() => {
          toast.info(
            `Tienes una cita con el paciente ID ${cita.pacienteId} el ${cita.fecha} a las ${cita.hora}`
          );
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

