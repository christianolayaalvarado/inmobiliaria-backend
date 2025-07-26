const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// ✅ GET: obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

// ✅ POST: registrar nuevo cliente
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
