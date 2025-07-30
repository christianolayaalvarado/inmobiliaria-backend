const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  contraseña: { type: String, required: true }
});

// Pre-save hook para hashear la contraseña si fue modificada o nueva
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Admin', AdminSchema);

