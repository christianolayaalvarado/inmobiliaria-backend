const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  contraseña: { type: String, required: true }
});

module.exports = mongoose.model('Admin', AdminSchema);
