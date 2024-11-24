module.exports = {
    testEnvironment: 'jsdom', // Necesario para renderizar componentes React
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest', // Asegura la transformación de archivos JSX
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Ignora estilos durante las pruebas
    },

    setupFiles: ['<rootDir>/jest.setup.js'], // Si usas un archivo setup

  };
  