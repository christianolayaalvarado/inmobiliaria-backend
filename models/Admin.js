const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  contraseña: { type: String, required: true }
});

// Hash antes de guardar
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

module.exports = mongoose.model('Admin', AdminSchema);
