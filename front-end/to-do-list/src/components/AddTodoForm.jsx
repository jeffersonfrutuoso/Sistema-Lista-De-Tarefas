import React, { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!name || !cost || !dueDate) {
      alert("Por favor, preencha todos os campos.");
      return; 
    }

    // Chama a função addTodo com os dados da nova tarefa
    addTodo({ name, cost: Number(cost), dueDate });

    // Limpa os campos do formulário
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
