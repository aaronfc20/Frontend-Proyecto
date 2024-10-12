import React from 'react';
import Notificaciones from './Notificaciones';

const DashboardDoctor = () => {
    return (
        <div>
             <h2>Bienvenido al panel de doctor</h2>
             <Notificaciones />
             <Outlet />
        </div>
       
        );
};

export default DashboardDoctor;
