const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

/**
 * @swagger
 * /ejercicios:
 *   get:
 *     summary: Lista todos los ejercicios
 *     tags: [Ejercicios]
 *     responses:
 *       200:
 *         description: Lista de ejercicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ejercicio'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /ejercicios - Listar todos
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('ejercicios')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/**
 * @swagger
 * /ejercicios/{id}:
 *   get:
 *     summary: Obtiene un ejercicio por su ID
 *     tags: [Ejercicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del ejercicio
 *     responses:
 *       200:
 *         description: Ejercicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ejercicio'
 *       404:
 *         description: Ejercicio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /ejercicios/:id - Obtener uno
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('ejercicios')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Ejercicio no encontrado' });
  res.json(data);
});

/**
 * @swagger
 * /ejercicios:
 *   post:
 *     summary: Crea un nuevo ejercicio
 *     tags: [Ejercicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EjercicioInput'
 *     responses:
 *       201:
 *         description: Ejercicio creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ejercicio'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// POST /ejercicios - Crear
router.post('/', async (req, res) => {
  const { nombre, grupo_muscular, descripcion, dificultad, imagen_url } = req.body;

  const { data, error } = await supabase
    .from('ejercicios')
    .insert([{ nombre, grupo_muscular, descripcion, dificultad, imagen_url }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

/**
 * @swagger
 * /ejercicios/{id}:
 *   put:
 *     summary: Actualiza un ejercicio existente
 *     tags: [Ejercicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del ejercicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EjercicioInput'
 *     responses:
 *       200:
 *         description: Ejercicio actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ejercicio'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// PUT /ejercicios/:id - Actualizar
router.put('/:id', async (req, res) => {
  const { nombre, grupo_muscular, descripcion, dificultad, imagen_url } = req.body;

  const { data, error } = await supabase
    .from('ejercicios')
    .update({ nombre, grupo_muscular, descripcion, dificultad, imagen_url })
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

/**
 * @swagger
 * /ejercicios/{id}:
 *   delete:
 *     summary: Elimina un ejercicio
 *     tags: [Ejercicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del ejercicio
 *     responses:
 *       200:
 *         description: Ejercicio eliminado
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
// DELETE /ejercicios/:id - Eliminar
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('ejercicios')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ mensaje: 'Ejercicio eliminado' });
});

module.exports = router;
