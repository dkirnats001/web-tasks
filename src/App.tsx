import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Counter from './components/Counter';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        padding: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Кастомный хук useCounter
      </Typography>

      <Stack
        direction="row"
        spacing={4}
        sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Counter />

        <Counter initialValue={10} />
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        Оба счётчика используют один и тот же кастомный хук useCounter
      </Typography>
    </Box>
  );
}

export default App;