import { useState } from 'react';
import TodoItem from './TodoItem';
import { VStack } from '@vapor-ui/core';

const TodoList = ({ todos, updateTodo, toggleComplete, deleteTodo }) => {
  return (
    <VStack $css={{ gap: '$50', marginTop: '$200', width: '100%' }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </VStack>
  );
};

export default TodoList;
