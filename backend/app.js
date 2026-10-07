const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

const personaRoutes = require('./routes/persona.routes');
app.use('/personas', personaRoutes);

const PORT = 3000;

sequelize.sync().then(() => {
  console.log('BD conectada');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error de conexión:', err.message);
});
