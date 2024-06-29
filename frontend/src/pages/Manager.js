// src/pages/Manager.js

import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Dashboard from '../components/Dashboard';
import Reservations from '../components/Reservations';
import Maintenance from '../components/Maintenance';

function Manager() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Manager Portal
          </Typography>
          <Button color="inherit" onClick={() => navigate('/manager')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/manager/reservations')}>Reservations</Button>
          <Button color="inherit" onClick={() => navigate('/manager/maintenance')}>Maintenance</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Manager;