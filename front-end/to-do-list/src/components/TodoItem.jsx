import React, { useState } from 'react';

const TodoItem = ({ todo, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ name: todo.name, cost: todo.cost, dueDate: todo.dueDate });

  const handleUpdate = () => {
    editTodo(todo.id, updatedTodo);
    setIsEditing(false);
  };

  return (
    <div style={{ background: todo.cost >= 1000 ? 'yellow' : 'white' }}>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={updatedTodo.name} 
            onChange={(e) => setUpdatedTodo({ ...updatedTodo, name: e.target.value })} 
          />
          <input 
            type="number" 
            value={updatedTodo.cost} 
            onChange={(e) => setUpdatedTodo({ ...updatedTodo, cost: parseFloat(e.target.value) })} 
          />
          <input 
            type="date" 
            value={updatedTodo.dueDate} 
            onChange={(e) => setUpdatedTodo({ ...updatedTodo, dueDate: e.target.value })} 
          />
          <button onClick={handleUpdate}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3>{todo.name}</h3>
          <p>Custo: R$ {todo.cost.toFixed(2)}</p>
          <p>Data Limite: {new Date(todo.dueDate).toLocaleDateString()}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => deleteTodo(todo.id)}>Excluir</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
