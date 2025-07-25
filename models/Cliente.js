const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  mensaje: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cliente', ClienteSchema);
