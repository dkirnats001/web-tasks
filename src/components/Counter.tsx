import React from 'react';
import {  Button, Typography, Paper } from '@mui/material';
import useCounter from '../hooks/useCounter';

// Пропс initialValue (необязательный)
interface CounterProps {
  initialValue?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue }) => {
  // Используем кастомный хук
  const { count, increment, decrement, reset } = useCounter(initialValue);

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 3,
        textAlign: 'center',
        minWidth: 250,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Счётчик
        {initialValue !== undefined && (
          <span
            style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}
          >
            (начало: {initialValue})
          </span>
        )}
      </Typography>

      <Typography
        variant="h3"
        component="div"
        sx={{ fontFamily: 'monospace', my: 2 }}
      >
        {count}
      </Typography>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={increment}>
          +1
        </Button>
        <Button variant="contained" color="secondary" onClick={decrement}>
          -1
        </Button>
        <Button variant="outlined" color="error" onClick={reset}>
          Сброс
        </Button>
      </div>
    </Paper>
  );
};

export default Counter;