const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/tarefa');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para interpretar JSON no corpo da requisição

// Rotas
app.use('/api/tarefas', taskRoutes);

// Sincronizando o banco de dados e iniciando o servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => console.error('Erro ao sincronizar com o banco de dados:', err));
