require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('✅ Conectado a MongoDB');

  const usuario = 'admin';
  const contraseñaPlano = 'admin123';

  const existe = await Admin.findOne({ usuario });
  if (existe) {
    console.log('⚠️ Ya existe un administrador con ese usuario.');
    return mongoose.disconnect();
  }

  // Guardar la contraseña en texto plano, el modelo la hasheará
  const nuevoAdmin = new Admin({ usuario, contraseña: contraseñaPlano });
  await nuevoAdmin.save();

  console.log('✅ Administrador creado con éxito.');
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err);
});
