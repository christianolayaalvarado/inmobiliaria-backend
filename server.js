const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const clienteRoutes = require('./routes/clienteRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Error MongoDB:', err));

app.listen(process.env.PORT || 4000, () => {
  console.log('Servidor corriendo en el puerto', process.env.PORT || 4000);
});
