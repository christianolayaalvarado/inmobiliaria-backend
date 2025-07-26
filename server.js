const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const clienteRoutes = require('./routes/clienteRoutes');
const path = require('path');
const app = express();

dotenv.config();


// Middleware
app.use(cors());
app.use(express.json());


// Servir favicon.ico en la raíz
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});



// Ruta base para verificar
app.get('/', (req, res) => {
  res.send('API de clientes inmobiliarios en línea');
});

// Rutas
app.use('/api/clientes', clienteRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Error MongoDB:', err));

//Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
   console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
