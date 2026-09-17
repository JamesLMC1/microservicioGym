const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

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
