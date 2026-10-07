const personaService = require('../services/persona.service');

exports.getAll = async (req, res) => {
  try {
    const data = await personaService.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const persona = await personaService.getById(req.params.id);
    if (!persona) return res.status(404).json({ mensaje: 'Persona no encontrada' });
    res.json(persona);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const persona = await personaService.create(req.body);
    res.json(persona);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const persona = await personaService.update(req.params.id, req.body);
    if (!persona) return res.status(404).json({ mensaje: 'Persona no encontrada' });
    res.json({ mensaje: 'Persona actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const resultado = await personaService.delete(req.params.id);
    if (!resultado) return res.status(404).json({ mensaje: 'Persona no encontrada' });
    res.json({ mensaje: 'Persona eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
