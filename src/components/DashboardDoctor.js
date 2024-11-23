import React from 'react';
import { Routes, Route, NavLink, useParams, Navigate } from 'react-router-dom';
import SearchPatient from './SearchPatient';
import RegisterPatient from './RegisterPatient';
import CrearCita from './CrearCita';
import Notificaciones from './Notificaciones'; // Importar las notificaciones
import Calendario from './Calendario';

import './DashboardDoctor.css';

const DashboardDoctor = () => {
    // Obtener los parámetros de la URL (role y userId)
    const { role, userId } = useParams();

    // Verificar si los valores de role y userId son correctos
    if (!userId || role !== 'doctor') {
        return <Navigate to="/login" />;
    }

    return (
        <div className="dashboard-doctor-background">
            <div className="dashboard-doctor container">
                <h1 id='titulo'>Panel de Control - Doctor</h1>
                <Notificaciones />  
                <nav className="nav-container">
                    <NavLink to={`/dashboard-doctor/${role}/${userId}/search`} className="nav-button" activeClassName="active">
                        Buscar Paciente
                    </NavLink>
                    <NavLink to={`/dashboard-doctor/${role}/${userId}/registrar`} className="nav-button" activeClassName="active">
                        Registrar Paciente
                    </NavLink>
                    <NavLink to={`/dashboard-doctor/${role}/${userId}/crear-cita`} className="nav-button" activeClassName="active">
                        Crear Cita Médica
                    </NavLink>
                    <NavLink to={`/dashboard-doctor/${role}/${userId}/calendario`} className="nav-button" activeClassName="active">
                        Calendario
                    </NavLink>
                </nav>
                <Routes>
                    <Route path="/search" element={<SearchPatient />} />
                    <Route path="/registrar" element={<RegisterPatient />} />
                    <Route path="/crear-cita" element={<CrearCita />} />
                    <Route path="/calendario" element={<Calendario />} />
                </Routes>
            </div>
        </div>
    );
};

export default DashboardDoctor;
