require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS: permite consumir la API desde otros orígenes (incluido Swagger UI)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : '*';

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));

// Rutas
app.use('/ejercicios', require('./routes/ejercicios'));
app.use('/rutinas', require('./routes/rutinas'));
app.use('/comidas', require('./routes/comidas'));

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Gym Microservice',
    documentacion: '/api-docs',
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
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
