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
import { NotasProvider } from './Context/NotasContext';
import EscogerPrueba from './components/EscogerPrueba';
import TestDePresion from './components/TestDePresion';
import Resultados from './components/Resultados';
function App() {
    return (
        <NotasProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} /> {/* Nueva ruta de registro */}
                        <Route path="/dashboard-usuario/:role/:userId/*" element={<DashboardUsuario />} />
                        <Route path="/dashboard-doctor/:role/:userId/*" element={<DashboardDoctor />} /> {/* El * permite subrutas */}
                        <Route path="/search" element={<SearchPatient />} />
                        <Route path="/edit/:id" element={<EditPatient />} />
                        <Route path="/reservar-cita-presencial" element={<ReservarCitaPresencial />} /> {/* Nueva ruta */}
                        <Route path="/reservar-teleconsulta" element={<ReservarTeleconsulta />} />
                        <Route path="/escoger-prueba" element={<EscogerPrueba />} />
                        <Route path="/test-depresion" element={<TestDePresion />} /> {/* Ruta para el test de depresión */}
                        <Route path="/resultados" element={<Resultados />} />
                    </Routes>
                </div>
            </Router>
        </NotasProvider>
    );
}

export default App;

