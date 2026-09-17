const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET /ejercicios - Listar todos
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('ejercicios')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

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
