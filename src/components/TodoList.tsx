import React, { useState, useRef } from 'react';
import TodoItem from './TodoItem';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(''); // НОВОЕ: состояние для поиска
  const [nextId, setNextId] = useState<number>(1);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    if (inputValue.trim() === '') {
      alert('Введите текст дела!');
      return;
    }
    
    const newTask: Task = {
      id: nextId,
      text: inputValue,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
    setNextId(nextId + 1);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // НОВОЕ: фильтрация задач по поисковому запросу
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>📝 Мой список дел</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Поиск по делам..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <button
          onClick={clearSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#9e9e9e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ✖ Очистить
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Что нужно сделать?"
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ➕ Добавить
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center' }}>
          Нет дел. Добавьте что-нибудь!
        </p>
      ) : (
        <>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
            {filteredTasks.length} из {tasks.length} дел показано
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTasks.map((task) => (
              <TodoItem
                key={task.id}
                todo={task.text}
                isCompleted={task.completed}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoList;