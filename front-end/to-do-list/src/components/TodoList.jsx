import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

const TodoList = ({ todos, editTodo, deleteTodo }) => (
  <Droppable droppableId="todo-list">
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {todos.map((todo, index) => (
          <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <TodoItem todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default TodoList;
