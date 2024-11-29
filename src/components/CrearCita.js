import React, { useState } from 'react'; 
import axios from 'axios'; 
import './CrearCita.css';  // Estilos específicos para CrearCita
import { motion } from 'framer-motion';


// 1. Importamos React y el hook 'useState', que nos permite gestionar el estado del componente.
// 2. Importamos 'axios', que se usa para realizar solicitudes HTTP al backend.
// 3. Importamos el archivo de estilos 'CrearCita.css' que contiene los estilos para este componente.

const CrearCita = () => { 
    // 4. Definimos el componente funcional 'CrearCita'. Es un componente funcional en React.

    // 5. Los siguientes 'useState' son hooks que nos permiten gestionar los estados de los campos del formulario.
    const [fecha, setFecha] = useState('');  // Estado para almacenar la fecha de la cita.
    const [hora, setHora] = useState('');  // Estado para almacenar la hora de la cita.
    const [pacienteId, setPacienteId] = useState('');  // Estado para almacenar el ID del paciente.
    const [doctorId, setDoctorId] = useState('');  // Estado para almacenar el ID del doctor.
    const [message, setMessage] = useState('');  // Estado para almacenar mensajes, como confirmación o errores.

    // 6. Función 'handleSubmit' que se ejecuta cuando se envía el formulario.
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        // 7. 'e.preventDefault()' evita que la página se recargue cuando se envía el formulario.

        try {
            // 8. Realizamos una solicitud POST al backend usando axios. Enviamos los datos de la cita (fecha, hora, pacienteId y doctorId).
            const response = await axios.post('http://localhost:3001/citas', {
                fecha, 
                hora,
                pacienteId,
                doctorId,
            });

            // 9. Si la respuesta es exitosa y tiene datos, mostramos un mensaje de éxito.
            if (response && response.data) {
                setMessage('Cita creada exitosamente');
            } else {
                // 10. Si algo falla, mostramos un mensaje de error.
                setMessage('Hubo un problema al crear la cita.');
            }

            // 11. Limpiamos los campos del formulario después de crear la cita.
            setFecha('');
            setHora('');
            setPacienteId('');
            setDoctorId('');
        } catch (error) {
            // 12. Si ocurre un error en la solicitud, mostramos el mensaje de error en la pantalla.
            setMessage('Error al crear la cita: ' + error.message);
        }
    };

    // 13. El JSX que renderiza el formulario de creación de citas. Contiene etiquetas HTML con clases CSS para aplicar estilos.
    return (
        <motion.div 
            className="crear-cita-container"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {/* 14. Título del formulario */}
            <h2 className="crear-cita-title">Crear Cita Médica</h2>

            {/* 15. Formulario para crear una cita */}
            <form onSubmit={handleSubmit}> 
                {/* 16. Grupo del formulario para la fecha */}
                <div className="crear-cita-form-group">
                    <label className="crear-cita-label">Fecha:</label>
                    <input
                        type="date"  // 17. Campo de entrada para seleccionar la fecha.
                        className="crear-cita-input"
                        value={fecha}  // 18. El valor del campo de entrada está vinculado al estado 'fecha'.
                        onChange={(e) => setFecha(e.target.value)}  // 19. Actualiza el estado 'fecha' cuando el usuario selecciona una fecha.
                        required  // 20. El campo es obligatorio.
                    />
                </div>

                {/* 21. Grupo del formulario para la hora */}
                <div className="crear-cita-form-group">
                    <label className="crear-cita-label">Hora:</label>
                    <input
                        type="time"  // 22. Campo de entrada para seleccionar la hora.
                        className="crear-cita-input"
                        value={hora}  // 23. El valor del campo de entrada está vinculado al estado 'hora'.
                        onChange={(e) => setHora(e.target.value)}  // 24. Actualiza el estado 'hora' cuando el usuario selecciona una hora.
                        required  // 25. El campo es obligatorio.
                    />
                </div>

                {/* 26. Grupo del formulario para el ID del paciente */}
                <div className="crear-cita-form-group">
                    <label className="crear-cita-label">ID del Paciente:</label>
                    <input
                        type="text"  // 27. Campo de entrada de texto para ingresar el ID del paciente.
                        className="crear-cita-input"
                        value={pacienteId}  // 28. El valor del campo de entrada está vinculado al estado 'pacienteId'.
                        onChange={(e) => setPacienteId(e.target.value)}  // 29. Actualiza el estado 'pacienteId' cuando el usuario escribe el ID.
                        required  // 30. El campo es obligatorio.
                    />
                </div>

                {/* 31. Grupo del formulario para el ID del doctor */}
                <div className="crear-cita-form-group">
                    <label className="crear-cita-label">ID del Médico:</label>
                    <input
                        type="text"  // 32. Campo de entrada de texto para ingresar el ID del doctor.
                        className="crear-cita-input"
                        value={doctorId}  // 33. El valor del campo de entrada está vinculado al estado 'doctorId'.
                        onChange={(e) => setDoctorId(e.target.value)}  // 34. Actualiza el estado 'doctorId' cuando el usuario escribe el ID.
                        required  // 35. El campo es obligatorio.
                    />
                </div>

                {/* 36. Botón para enviar el formulario y crear la cita */}
                <button type="submit" className="crear-cita-button">Crear Cita</button>

                {/* 37. Mensaje que se muestra si hay un mensaje en el estado 'message' */}
                {message && <p className="crear-cita-message">{message}</p>}
            </form>
        </motion.div>
    );
};

export default CrearCita;

// 38. Exportamos el componente 'CrearCita' para que pueda ser utilizado en otras partes de la aplicación.
