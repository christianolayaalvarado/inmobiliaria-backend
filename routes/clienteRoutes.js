const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Ruta para exportar todos los clientes en CSV
router.get('/exportar', async (req, res) => {
  try {
    const clientes = await Cliente.find().lean();

    if (!clientes.length) {
      return res.status(404).send('No hay datos para exportar.');
    }

    const encabezado = 'Nombre,Correo,Teléfono,Mensaje,Fecha\n';
    const filas = clientes
      .map(c => `"${c.nombre}","${c.correo}","${c.telefono}","${c.mensaje}","${new Date(c.fecha).toLocaleString()}"`)
      .join('\n');

    const csv = encabezado + filas;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=clientes.csv');
    res.send(csv);
  } catch (error) {
    console.error('❌ Error al exportar:', error);
    res.status(500).send('Error al exportar los datos.');
  }
});

module.exports = router;



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
