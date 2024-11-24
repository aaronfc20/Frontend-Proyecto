import React, { createContext, useReducer, useEffect } from 'react';

// Crear el contexto
export const NotasContext = createContext();

// Reducer para manejar acciones del estado
const notasReducer = (state, action) => {
    switch (action.type) {
        case 'CARGAR_NOTAS':
            return action.payload;
        case 'AGREGAR_NOTA':
            return [...state, action.payload];
        case 'ELIMINAR_NOTA':
            return state.filter((_, index) => index !== action.payload);
        default:
            return state;
    }
};

// Proveedor del contexto
export const NotasProvider = ({ children }) => {
    const [notas, dispatch] = useReducer(notasReducer, []);

    // Cargar notas desde localStorage al iniciar la app
    useEffect(() => {
        try {
            const savedNotas = JSON.parse(localStorage.getItem('notas')) || [];
            dispatch({ type: 'CARGAR_NOTAS', payload: savedNotas });
        } catch (error) {
            console.error('Error al cargar las notas del localStorage:', error);
        }
    }, []);

    // Guardar notas en localStorage cada vez que cambien
    useEffect(() => {
        try {
            localStorage.setItem('notas', JSON.stringify(notas));
        } catch (error) {
            console.error('Error al guardar las notas en localStorage:', error);
        }
    }, [notas]);

    // Función para agregar una nueva nota
    const agregarNota = (nota) => {
        dispatch({ type: 'AGREGAR_NOTA', payload: nota });
    };

    // Función para eliminar una nota
    const eliminarNota = (index) => {
        dispatch({ type: 'ELIMINAR_NOTA', payload: index });
    };

    return (
        <NotasContext.Provider value={{ notas, agregarNota, eliminarNota }}>
            {children}
        </NotasContext.Provider>
    );
};
