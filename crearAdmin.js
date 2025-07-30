require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Conectado a MongoDB');

  // Datos del nuevo admin
  const usuario = 'admin';
  const contraseñaPlano = 'admin123';

  // Verifica si ya existe
  const existe = await Admin.findOne({ usuario });
  if (existe) {
    console.log('⚠️ Ya existe un administrador con ese usuario.');
    return mongoose.disconnect();
  }

  // Crear y guardar el nuevo admin
  const nuevoAdmin = new Admin({ usuario, contraseña: contraseñaPlano });
  await nuevoAdmin.save();

  console.log('✅ Administrador creado con éxito.');
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err);
});
