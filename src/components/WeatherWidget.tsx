import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
  Stack
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import RainIcon from '@mui/icons-material/Grain';
import ThunderstormIcon from '@mui/icons-material/FlashOn';


interface WeatherData {
  temperature: number;
  description: string;
  city: string;
  country: string;
  condition: string;
}

const fetchWeather = async (): Promise<WeatherData> => {
  // Симулируем задержку сети
  await new Promise(resolve => setTimeout(resolve, 1000));
  

  const mockData: WeatherData = {
    temperature: Math.floor(Math.random() * 30) + 5,
    description: 'Облачно с прояснениями',
    city: 'Москва',
    country: 'Россия',
    condition: 'clouds'
  };
  
  return mockData;
};

const sendPostRequest = async (): Promise<void> => {
  await axios.post('https://jsonplaceholder.typicode.com/posts', {
    body: JSON.stringify({
      message: 'Мутация вызвана из WeatherWidget',
      timestamp: new Date().toISOString()
    })
  });
};

const WeatherWidget: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: weather,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<WeatherData>({
    queryKey: ['weather'],
    queryFn: fetchWeather,
  });

  const mutation = useMutation({
    mutationFn: sendPostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weather'] });
      alert('POST-запрос отправлен! Данные погоды обновлены.');
    },
    onError: () => {
      alert('Ошибка при отправке POST-запроса');
    }
  });

  const getWeatherIcon = () => {
    if (!weather) return <WbSunnyIcon sx={{ fontSize: 60 }} />;
    switch (weather.condition) {
      case 'sunny':
        return <WbSunnyIcon sx={{ fontSize: 60, color: '#FFD700' }} />;
      case 'clouds':
        return <CloudIcon sx={{ fontSize: 60, color: '#90A4AE' }} />;
      case 'rain':
        return <RainIcon sx={{ fontSize: 60, color: '#4FC3F7' }} />;
      case 'storm':
        return <ThunderstormIcon sx={{ fontSize: 60, color: '#FF6F00' }} />;
      default:
        return <WbSunnyIcon sx={{ fontSize: 60 }} />;
    }
  };

  if (isLoading) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400, mx: 'auto', mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Загрузка погоды...</Typography>
      </Paper>
    );
  }

  if (isError) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400, mx: 'auto', mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Ошибка загрузки данных: {error?.message || 'Неизвестная ошибка'}
        </Alert>
        <Button variant="contained" onClick={() => refetch()}>
          Попробовать снова
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Stack spacing={2} alignItems="center">
        {getWeatherIcon()}
        
        <Typography variant="h3" component="div">
          {weather?.temperature}°C
        </Typography>
        
        <Typography variant="h6" color="text.secondary">
          {weather?.description}
        </Typography>
        
        <Typography variant="body1">
          📍 {weather?.city}, {weather?.country}
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          sx={{ mt: 2 }}
        >
          {mutation.isPending ? 'Отправка...' : 'Отправить POST-запрос'}
        </Button>
        
        {mutation.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Ошибка при отправке запроса
          </Alert>
        )}
      </Stack>
    </Paper>
  );
};

export default WeatherWidget;