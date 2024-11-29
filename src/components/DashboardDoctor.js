import React from 'react';
import { NavLink, useParams, Navigate } from 'react-router-dom';
import Notificaciones from './Notificaciones.js'; // Importar las notificaciones
import RutasAnimadasDoctor from './AnimacionDashDoctor.js';

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
                <h1 id="titulo">Panel de Control - Doctor</h1>
                <Notificaciones />
                <nav className="navbar">
                    <ul className="navbar-list">
                        <li>
                            <NavLink
                                to={`/dashboard-doctor/${role}/${userId}/search`}
                                className="navbar-link"
                                activeClassName="active"
                            >
                                Buscar Paciente
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/dashboard-doctor/${role}/${userId}/registrar`}
                                className="navbar-link"
                                activeClassName="active"
                            >
                                Registrar Paciente
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/dashboard-doctor/${role}/${userId}/crear-cita`}
                                className="navbar-link"
                                activeClassName="active"
                            >
                                Crear Cita Médica
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/dashboard-doctor/${role}/${userId}/mis-citas`}
                                className="navbar-link"
                                activeClassName="active"
                            >
                                Mis Citas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/dashboard-doctor/${role}/${userId}/calendario`}
                                className="navbar-link"
                                activeClassName="active"
                            >
                                Calendario
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/dashboard-doctor/${role}/${userId}/notas-rapidas`}
                                className="navbar-link"
                                activeClassName="active"
                            >
                                Notas Rápidas
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <RutasAnimadasDoctor />
            </div>
        </div>
    );
};

export default DashboardDoctor;
