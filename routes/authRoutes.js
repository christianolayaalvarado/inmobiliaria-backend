const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Login: devuelve un token si las credenciales son correctas
router.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const admin = await Admin.findOne({ usuario });
    if (!admin) return res.status(401).json({ error: 'Usuario inválido' });

    const match = await bcrypt.compare(contraseña, admin.contraseña);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
