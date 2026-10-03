const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const personaRoutes = require('./routes/persona.routes');
app.use('/personas', personaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
