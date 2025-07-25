const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

router.post('/registrar', async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).json({ mensaje: 'Datos guardados correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar datos' });
  }
});

module.exports = router;
