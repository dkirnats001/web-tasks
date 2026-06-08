import React from 'react';
import { Paper, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PromoSuccess: React.FC = () => {
  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
      <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
      <Typography variant="h4" color="success.main" gutterBottom>
        Промокод применен!
      </Typography>
      <Typography variant="body1">
        Спасибо за использование промокода!
      </Typography>
    </Paper>
  );
};

export default PromoSuccess;