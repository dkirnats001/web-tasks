import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Typography } from '@mui/material';

const PromoInput: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const navigate = useNavigate();

  const SECRET_CODE = "SECRET123";

  useEffect(() => {
    if (code === SECRET_CODE) {
      navigate('/activated');
    }
  }, [code, navigate]);

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Введите промокод
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Подсказка: SECRET123
      </Typography>
      <TextField
        fullWidth
        label="Промокод"
        variant="outlined"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Введите код..."
      />
    </Paper>
  );
};

export default PromoInput;