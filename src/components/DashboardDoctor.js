import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import SearchPatient from './SearchPatient';
import RegisterPatient from './RegisterPatient';
import './DashboardDoctor.css';
import CrearCita from './CrearCita';
const DashboardDoctor = () => {
    return (
        <div className="dashboard-doctor-background">
            <div className="dashboard-doctor container">
                <h1>Panel de Control - Doctor</h1>
                <nav className="nav-container">
                    <NavLink to="/dashboard-doctor/search" className="nav-button" activeClassName="active">
                        Buscar Paciente
                    </NavLink>
                    <NavLink to="/dashboard-doctor/registrar" className="nav-button" activeClassName="active">
                        Registrar Paciente
                    </NavLink>
                    <NavLink to="/dashboard-doctor/crear-cita" className="nav-button" activeClassName="active">
                        Crear Cita Médica
                    </NavLink>
                </nav>
                <Routes>
                    <Route path="/search" element={<SearchPatient />} />
                    <Route path="/registrar" element={<RegisterPatient />} />
                    <Route path="/crear-cita" element={<CrearCita />} />
                </Routes>
            </div>
        </div>
    );
};

export default DashboardDoctor;