import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import DashboardUsuario from './components/DashboardUsuario';
import DashboardDoctor from './components/DashboardDoctor';
import Register from './components/Register'; // Asegúrate de importar el componente de registro
import SearchPatient from './components/SearchPatient'; // Agregar la importación de SearchPatient
import EditPatient from './components/editPatient'; // Agregar la importación de EditPatient
import ReservarCitaPresencial from './components/ReservarCitaPresencial';
import ReservarTeleconsulta from './components/ReservarTeleconsulta';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} /> {/* Nueva ruta de registro */}
                    <Route path="/dashboard-usuario" element={<DashboardUsuario />} />
                    <Route path="/dashboard-doctor/*" element={<DashboardDoctor />} /> {/* El * permite subrutas */}
                    <Route path="/search" element={<SearchPatient />} />
                    <Route path="/edit/:id" element={<EditPatient />} />
                    <Route path="/reservar-cita-presencial" element={<ReservarCitaPresencial />} /> {/* Nueva ruta */}
                    <Route path="/reservar-teleconsulta" element={<ReservarTeleconsulta />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

