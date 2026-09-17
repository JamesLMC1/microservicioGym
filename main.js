require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/ejercicios', require('./routes/ejercicios'));
app.use('/rutinas', require('./routes/rutinas'));
app.use('/comidas', require('./routes/comidas'));

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Gym Microservice',
    endpoints: {
      ejercicios: '/ejercicios',
      rutinas: '/rutinas',
      comidas: '/comidas'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
