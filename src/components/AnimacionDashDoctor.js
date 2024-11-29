import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import SearchPatient from './SearchPatient';
import RegisterPatient from './RegisterPatient';
import CrearCita from './CrearCita';
import MisCitasDoctor from './MisCitasDoctor';
import Calendario from './calendario/Calendario';
import NotasRápidas from './NotasRápidas';
import { AnimatePresence } from 'framer-motion';

function RutasAnimadasDoctor() {
    const location = useLocation();
    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/search" element={<SearchPatient />} />
                <Route path="/registrar" element={<RegisterPatient />} />
                <Route path="/crear-cita" element={<CrearCita />} />
                <Route path="/mis-citas" element={<MisCitasDoctor />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/notas-rapidas" element={<NotasRápidas />} />
            </Routes>
        </AnimatePresence>
    )
}

export default RutasAnimadasDoctor