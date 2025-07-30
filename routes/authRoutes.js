const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// 🔐 LOGIN: devuelve un token si las credenciales son correctas
router.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    console.log('🔐 Intentando login...');
    console.log('📝 Usuario recibido:', usuario);

    const admin = await Admin.findOne({ usuario });
    if (!admin) {
      console.log('❌ Usuario no encontrado');
      return res.status(401).json({ error: 'Usuario inválido' });
    }

    console.log('✅ Usuario encontrado:', admin.usuario);
    console.log('🔒 Contraseña en DB:', admin.contraseña);

    const match = await bcrypt.compare(contraseña, admin.contraseña);
    if (!match) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    console.log('✅ Login exitoso. Token generado.');
    res.json({ token });
  } catch (err) {
    console.error('💥 Error en login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;

