import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

interface Lap {
  id: number;
  time: number;
  lapNumber: number;
}

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [speed, setSpeed] = useState<number>(1);
  
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime(prevTime => prevTime + (1 * speed));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setSpeed(1);
  };
  
  const handleLap = () => {
    if (time > 0) {
      const newLap: Lap = {
        id: Date.now(),
        time: time,
        lapNumber: laps.length + 1
      };
      setLaps([...laps, newLap]);
    }
  };
  
  const handleSpeedUp = () => {
    if (speed < 2) {
      setSpeed(2);
    }
  };
  
  const handleSlowDown = () => {
    if (speed > 0.5) {
      setSpeed(0.5);
    }
  };
  
  const handleNormalSpeed = () => {
    setSpeed(1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Секундомер
        </Typography>
        
        <Typography variant="h2" component="div" sx={{ fontFamily: 'monospace', mb: 2 }}>
          {formatTime(time)}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Скорость: {speed === 0.5 ? '×0.5 (медленно)' : speed === 1 ? '×1 (нормально)' : '×2 (быстро)'}
        </Typography>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
          <Button variant="contained" color="success" onClick={handleStart}>
            Старт
          </Button>
          <Button variant="contained" color="error" onClick={handleStop}>
            Стоп
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Сброс
          </Button>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleLap}>
            🔄 Круг
          </Button>
          <Divider orientation="vertical" flexItem sx={{ height: 36 }} />
          <Button variant="outlined" onClick={handleSpeedUp}>
            ⚡ ×2
          </Button>
          <Button variant="outlined" onClick={handleNormalSpeed}>
            ⚡ ×1
          </Button>
          <Button variant="outlined" onClick={handleSlowDown}>
            ⚡ ×0.5
          </Button>
        </div>
        
        {laps.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Круги:
            </Typography>
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {laps.map((lap) => (
                <ListItem key={lap.id} divider>
                  <ListItemText
                    primary={`Круг ${lap.lapNumber}`}
                    secondary={formatTime(lap.time)}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Stopwatch;