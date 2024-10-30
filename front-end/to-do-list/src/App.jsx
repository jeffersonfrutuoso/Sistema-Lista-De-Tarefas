import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tarefas');
        setTodos(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tarefas', todo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error.response?.data?.error || error);
    }
  };

  const editTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tarefas/${id}`, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map(todo => (todo.id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tarefas/${id}`);
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);

    setTodos(reorderedTodos);

    
    const reorderedTasks = reorderedTodos.map((todo, index) => ({ ...todo, order: index + 1 }));
    await axios.put('http://localhost:5000/api/tarefas/reorder', { reorderedTasks });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <h1>Lista de Tarefas</h1>
        <AddTodoForm addTodo={addTodo} />
        <TodoList todos={todos} editTodo={editTodo} deleteTodo={deleteTodo} />
      </div>
    </DragDropContext>
  );
};

export default App;
