const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gym Microservice',
      version: '1.0.0',
      description:
        'Microservicio de gym para la gestión de ejercicios, rutinas y comidas (dieta).',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor local',
      },
    ],
    tags: [
      { name: 'Ejercicios', description: 'Gestión de ejercicios' },
      { name: 'Rutinas', description: 'Gestión de rutinas y sus ejercicios' },
      { name: 'Comidas', description: 'Gestión de comidas y dieta' },
    ],
    components: {
      schemas: {
        Ejercicio: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', readOnly: true },
            nombre: { type: 'string', example: 'Press de banca' },
            grupo_muscular: { type: 'string', example: 'pecho' },
            descripcion: {
              type: 'string',
              example: 'Ejercicio compuesto para el pecho con barra',
            },
            dificultad: {
              type: 'string',
              enum: ['principiante', 'intermedio', 'avanzado'],
              example: 'intermedio',
            },
            imagen_url: {
              type: 'string',
              nullable: true,
              example: 'https://ejemplo.com/press-banca.png',
            },
            created_at: { type: 'string', format: 'date-time', readOnly: true },
          },
        },
        EjercicioInput: {
          type: 'object',
          required: ['nombre', 'grupo_muscular'],
          properties: {
            nombre: { type: 'string', example: 'Press de banca' },
            grupo_muscular: { type: 'string', example: 'pecho' },
            descripcion: {
              type: 'string',
              example: 'Ejercicio compuesto para el pecho con barra',
            },
            dificultad: {
              type: 'string',
              enum: ['principiante', 'intermedio', 'avanzado'],
              example: 'intermedio',
            },
            imagen_url: {
              type: 'string',
              nullable: true,
              example: 'https://ejemplo.com/press-banca.png',
            },
          },
        },
        Rutina: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', readOnly: true },
            nombre: { type: 'string', example: 'Push Pull Legs' },
            descripcion: {
              type: 'string',
              example: 'Rutina PPL clásica de 6 días',
            },
            nivel: {
              type: 'string',
              enum: ['principiante', 'intermedio', 'avanzado'],
              example: 'intermedio',
            },
            duracion_dias: { type: 'integer', example: 6 },
            created_at: { type: 'string', format: 'date-time', readOnly: true },
          },
        },
        RutinaInput: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: { type: 'string', example: 'Push Pull Legs' },
            descripcion: {
              type: 'string',
              example: 'Rutina PPL clásica de 6 días',
            },
            nivel: {
              type: 'string',
              enum: ['principiante', 'intermedio', 'avanzado'],
              example: 'intermedio',
            },
            duracion_dias: { type: 'integer', example: 6 },
          },
        },
        RutinaDetalle: {
          allOf: [
            { $ref: '#/components/schemas/Rutina' },
            {
              type: 'object',
              properties: {
                ejercicios: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', format: 'uuid' },
                      rutina_id: { type: 'string', format: 'uuid' },
                      ejercicio_id: { type: 'string', format: 'uuid' },
                      series: { type: 'integer', example: 4 },
                      repeticiones: { type: 'string', example: '8-10' },
                      descanso_segundos: { type: 'integer', example: 90 },
                      ejercicios: {
                        $ref: '#/components/schemas/Ejercicio',
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        Comida: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', readOnly: true },
            nombre: { type: 'string', example: 'Avena con huevos' },
            tipo: {
              type: 'string',
              enum: ['desayuno', 'almuerzo', 'cena', 'snack'],
              example: 'desayuno',
            },
            calorias: { type: 'integer', example: 450 },
            proteinas_g: { type: 'number', example: 30 },
            carbos_g: { type: 'number', example: 45 },
            grasas_g: { type: 'number', example: 15 },
            receta: {
              type: 'string',
              example: 'Avena cocida con leche y 3 huevos revueltos',
            },
            created_at: { type: 'string', format: 'date-time', readOnly: true },
          },
        },
        ComidaInput: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: { type: 'string', example: 'Avena con huevos' },
            tipo: {
              type: 'string',
              enum: ['desayuno', 'almuerzo', 'cena', 'snack'],
              example: 'desayuno',
            },
            calorias: { type: 'integer', example: 450 },
            proteinas_g: { type: 'number', example: 30 },
            carbos_g: { type: 'number', example: 45 },
            grasas_g: { type: 'number', example: 15 },
            receta: {
              type: 'string',
              example: 'Avena cocida con leche y 3 huevos revueltos',
            },
          },
        },
        Mensaje: {
          type: 'object',
          properties: {
            mensaje: { type: 'string', example: 'Recurso eliminado' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Descripción del error' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
