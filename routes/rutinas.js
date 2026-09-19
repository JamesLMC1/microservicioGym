const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

/**
 * @swagger
 * /rutinas:
 *   get:
 *     summary: Lista todas las rutinas
 *     tags: [Rutinas]
 *     responses:
 *       200:
 *         description: Lista de rutinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rutina'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /rutinas - Listar todas
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('rutinas')
    .select('*');

  if (error) {
    console.error('Error en GET /rutinas:', error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

/**
 * @swagger
 * /rutinas/{id}:
 *   get:
 *     summary: Obtiene una rutina con sus ejercicios
 *     tags: [Rutinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la rutina
 *     responses:
 *       200:
 *         description: Rutina con el detalle de sus ejercicios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RutinaDetalle'
 *       404:
 *         description: Rutina no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /rutinas/:id - Obtener una con sus ejercicios
router.get('/:id', async (req, res) => {
  const { data: rutina, error: err1 } = await supabase
    .from('rutinas')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (err1) return res.status(404).json({ error: 'Rutina no encontrada' });

  const { data: ejercicios, error: err2 } = await supabase
    .from('rutina_ejercicios')
    .select('*, ejercicios(*)')
    .eq('rutina_id', req.params.id);

  if (err2) return res.status(500).json({ error: err2.message });

  res.json({ ...rutina, ejercicios });
});

/**
 * @swagger
 * /rutinas:
 *   post:
 *     summary: Crea una nueva rutina
 *     tags: [Rutinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RutinaInput'
 *     responses:
 *       201:
 *         description: Rutina creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rutina'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// POST /rutinas - Crear
router.post('/', async (req, res) => {
  const { nombre, descripcion, nivel, duracion_dias } = req.body;

  const { data, error } = await supabase
    .from('rutinas')
    .insert([{ nombre, descripcion, nivel, duracion_dias }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

/**
 * @swagger
 * /rutinas/{id}:
 *   put:
 *     summary: Actualiza una rutina existente
 *     tags: [Rutinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la rutina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RutinaInput'
 *     responses:
 *       200:
 *         description: Rutina actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rutina'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// PUT /rutinas/:id - Actualizar
router.put('/:id', async (req, res) => {
  const { nombre, descripcion, nivel, duracion_dias } = req.body;

  const { data, error } = await supabase
    .from('rutinas')
    .update({ nombre, descripcion, nivel, duracion_dias })
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

/**
 * @swagger
 * /rutinas/{id}:
 *   delete:
 *     summary: Elimina una rutina
 *     tags: [Rutinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la rutina
 *     responses:
 *       200:
 *         description: Rutina eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       400:
 *         description: No se pudo eliminar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// DELETE /rutinas/:id - Eliminar
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('rutinas')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ mensaje: 'Rutina eliminada' });
});

module.exports = router;
