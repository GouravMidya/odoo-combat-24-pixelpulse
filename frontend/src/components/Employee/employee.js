// EmployeePage.js

import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import { getCurrentMaintenance, updateMaintenance, updateReservation } from '../services/employeeService';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const EmployeePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [maintenance, setMaintenance] = useState('');
  const [reservation, setReservation] = useState('');

  // Example of fetching data on component mount
  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const maintenanceData = await getCurrentMaintenance();
        setMaintenance(maintenanceData);
      } catch (error) {
        console.error('Error fetching maintenance:', error.message);
      }
    };

    // Call the fetch function
    fetchMaintenance();
  }, []);

  // Function to handle maintenance update
  const handleMaintenanceUpdate = async () => {
    try {
      // Call updateMaintenance function from service
      const updatedMaintenance = await updateMaintenance(/* Provide necessary parameters */);
      setMaintenance(updatedMaintenance);
      // Optionally dispatch an action if using Redux
      // dispatch({ type: 'UPDATE_MAINTENANCE', payload: updatedMaintenance });
      console.log('Maintenance updated successfully.');
    } catch (error) {
      console.error('Error updating maintenance:', error.message);
    }
  };

  // Function to handle reservation update
  const handleReservationUpdate = async () => {
    try {
      // Call updateReservation function from service
      const updatedReservation = await updateReservation(/* Provide necessary parameters */);
      setReservation(updatedReservation);
      // Optionally dispatch an action if using Redux
      // dispatch({ type: 'UPDATE_RESERVATION', payload: updatedReservation });
      console.log('Reservation updated successfully.');
    } catch (error) {
      console.error('Error updating reservation:', error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Current Maintenance
            </Typography>
            <Typography variant="body1">{maintenance}</Typography>
            <Button variant="contained" color="primary" onClick={handleMaintenanceUpdate}>
              Update Maintenance
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Update Reservation
            </Typography>
            <TextField
              label="Reservation"
              variant="outlined"
              fullWidth
              value={reservation}
              onChange={(e) => setReservation(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleReservationUpdate}>
              Update Reservation
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeePage;
