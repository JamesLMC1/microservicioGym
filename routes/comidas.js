const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

/**
 * @swagger
 * /comidas:
 *   get:
 *     summary: Lista todas las comidas
 *     tags: [Comidas]
 *     responses:
 *       200:
 *         description: Lista de comidas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comida'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /comidas - Listar todas
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('comidas')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/**
 * @swagger
 * /comidas/{id}:
 *   get:
 *     summary: Obtiene una comida por su ID
 *     tags: [Comidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la comida
 *     responses:
 *       200:
 *         description: Comida encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comida'
 *       404:
 *         description: Comida no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /comidas/:id - Obtener una
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('comidas')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Comida no encontrada' });
  res.json(data);
});

/**
 * @swagger
 * /comidas:
 *   post:
 *     summary: Crea una nueva comida
 *     tags: [Comidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComidaInput'
 *     responses:
 *       201:
 *         description: Comida creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comida'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// POST /comidas - Crear
router.post('/', async (req, res) => {
  const { nombre, tipo, calorias, proteinas_g, carbos_g, grasas_g, receta } = req.body;

  const { data, error } = await supabase
    .from('comidas')
    .insert([{ nombre, tipo, calorias, proteinas_g, carbos_g, grasas_g, receta }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

/**
 * @swagger
 * /comidas/{id}:
 *   put:
 *     summary: Actualiza una comida existente
 *     tags: [Comidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la comida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComidaInput'
 *     responses:
 *       200:
 *         description: Comida actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comida'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// PUT /comidas/:id - Actualizar
router.put('/:id', async (req, res) => {
  const { nombre, tipo, calorias, proteinas_g, carbos_g, grasas_g, receta } = req.body;

  const { data, error } = await supabase
    .from('comidas')
    .update({ nombre, tipo, calorias, proteinas_g, carbos_g, grasas_g, receta })
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

/**
 * @swagger
 * /comidas/{id}:
 *   delete:
 *     summary: Elimina una comida
 *     tags: [Comidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la comida
 *     responses:
 *       200:
 *         description: Comida eliminada
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
// DELETE /comidas/:id - Eliminar
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('comidas')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ mensaje: 'Comida eliminada' });
});

module.exports = router;
