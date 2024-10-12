import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SearchPatient from './components/SearchPatient';
import RegisterPatient from './components/RegisterPatient';
import './App.css'; // Asegúrate de que esta línea esté presente

const App = () => {
    return (
        <div className="container">
            <h1>Historial Médico</h1>
            <nav className="nav-container">
                <Link to="/" className="nav-button">Buscar Paciente</Link>
                <Link to="/registrar" className="nav-button">Registrar Paciente</Link>
            </nav>
            <Routes>
                <Route path="/" element={<SearchPatient />} />
                <Route path="/registrar" element={<RegisterPatient />} />
            </Routes>
        </div>
    );
};

export default App;

