import React from 'react';

interface TodoItemProps {
  todo: string;
  onToggle: () => void;
  onDelete: () => void;
  isCompleted: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, isCompleted }) => {
  return (
    <li style={{ 
      textDecoration: isCompleted ? 'line-through' : 'none',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <span style={{ flex: 1 }}>{todo}</span>
      <button onClick={onToggle} style={{ 
        backgroundColor: isCompleted ? '#4CAF50' : '#ff9800',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        {isCompleted ? '✓ Выполнено' : '☐ Выполнить'}
      </button>
      <button onClick={onDelete} style={{
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        ✗ Удалить
      </button>
    </li>
  );
};

export default TodoItem;