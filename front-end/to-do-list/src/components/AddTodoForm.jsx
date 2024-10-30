import React, { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cost || !dueDate) return; // Verifica se todos os campos estão preenchidos
    addTodo({ name, cost: Number(cost), dueDate });
    setName('');
    setCost('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da tarefa"
        required
      />
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Custo"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default AddTodoForm;
