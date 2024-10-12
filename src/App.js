import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import DashboardUsuario from './components/DashboardUsuario';
import DashboardDoctor from './components/DashboardDoctor';
import Register from './components/Register'; // Asegúrate de importar el componente de registro

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} /> {/* Nueva ruta de registro */}
                    <Route path="/dashboard-usuario" element={<DashboardUsuario />} />
                    <Route path="/dashboard-doctor/*" element={<DashboardDoctor />} /> {/* El * permite subrutas */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
