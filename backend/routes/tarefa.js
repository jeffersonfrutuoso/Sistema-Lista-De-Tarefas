const express = require('express');
const Tarefa = require('../models/Tarefa');
const router = express.Router();

// Rota para obter todas as tarefas, ordenadas
router.get('/', async (req, res) => {
  try {
    const tasks = await Tarefa.findAll({ order: [['order', 'ASC']] });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// Rota para adicionar uma nova tarefa ao final da ordem
router.post('/', async (req, res) => {
  const { name, cost, dueDate } = req.body;
  try {
    const existingTask = await Tarefa.findOne({ where: { name } });
    if (existingTask) {
      return res.status(400).json({ error: 'Uma tarefa com esse nome já existe.' });
    }

    // Define a ordem como o último valor + 1
    const lastTask = await Tarefa.findOne({ order: [['order', 'DESC']] });
    const newOrder = lastTask ? lastTask.order + 1 : 1;

    const newTask = await Tarefa.create({ name, cost, dueDate, order: newOrder });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar tarefa' });
  }
});

// Rota para atualizar uma tarefa existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cost, dueDate } = req.body;

  try {
    const existingTask = await Tarefa.findOne({ where: { id } });
    if (!existingTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    await Tarefa.update({ name, cost, dueDate }, { where: { id } });
    const updatedTask = await Tarefa.findOne({ where: { id } });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
  }
});

// Rota para excluir uma tarefa
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await Tarefa.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa.' });
  }
});

// Rota para atualizar a ordem de várias tarefas
router.put('/reorder', async (req, res) => {
  const { reorderedTasks } = req.body;
  try {
    const updatePromises = reorderedTasks.map((task, index) =>
      Tarefa.update({ order: index + 1 }, { where: { id: task.id } })
    );
    await Promise.all(updatePromises);
    res.status(200).send('Ordem atualizada com sucesso');
  } catch (error) {
    res.status(500).json({ error: 'Erro ao reordenar tarefas' });
  }
});



module.exports = router;
