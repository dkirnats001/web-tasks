import React, { useState } from 'react';
import TodoItem from './TodoItem';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  // Состояния (useState из лекции)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [nextId, setNextId] = useState<number>(1);

  // Функция добавления дела
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

  // Функция переключения статуса (выполнено/не выполнено)
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Функция удаления дела
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>📝 Мой список дел</h2>
      
      {/* Поле ввода и кнопка добавления */}
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
      
      {/* Условный рендеринг: если дел нет - показываем сообщение */}
      {tasks.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center' }}>
          Нет дел. Добавьте что-нибудь!
        </p>
      ) : (
        /* Циклический рендеринг: перебираем массив дел */
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}  
              todo={task.text}
              isCompleted={task.completed}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
