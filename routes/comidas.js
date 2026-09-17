const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET /comidas - Listar todas
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('comidas')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

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
