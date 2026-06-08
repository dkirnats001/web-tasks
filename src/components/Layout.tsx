import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Мой сайт
          </Typography>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Button color="inherit" sx={{ fontWeight: isActive ? 'bold' : 'normal' }}>
                Промокод
              </Button>
            )}
          </NavLink>
          <NavLink to="/activated" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Button color="inherit" sx={{ fontWeight: isActive ? 'bold' : 'normal' }}>
                Активировано
              </Button>
            )}
          </NavLink>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, flex: 1 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
        <Typography variant="body2">© 2024 Мой сайт</Typography>
      </Box>
    </Box>
  );
};

export default Layout;