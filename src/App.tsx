import React from 'react';
import WeatherWidget from './components/WeatherWidget';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h4" component="h1" textAlign="center" sx={{ my: 3 }}>
        Погодный виджет
      </Typography>
      <WeatherWidget />
    </Container>
  );
}

export default App;
