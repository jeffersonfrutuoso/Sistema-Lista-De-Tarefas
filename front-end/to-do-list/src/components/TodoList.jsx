import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, editTodo, deleteTodo }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          editTodo={editTodo} 
          deleteTodo={deleteTodo} 
        />
      ))}
    </div>
  );
};

export default TodoList;
