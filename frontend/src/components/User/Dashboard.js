// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { getUserReservations } from '../../utils/reservations';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';

const UserDashboard = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getUserReservations(userId);
        setReservations(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading reservations.</Typography>;

  // Separate reservations into upcoming and past
  const upcomingReservations = reservations.filter(reservation => new Date(reservation.endTime) > new Date());
  const pastReservations = reservations.filter(reservation => new Date(reservation.endTime) <= new Date());

  return (
    <Grid container spacing={3}>
      {upcomingReservations.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="h5">Upcoming Reservations</Typography>
        </Grid>
      )}
      {upcomingReservations.map((reservation) => (
        <Grid item xs={12} sm={6} md={4} key={reservation._id}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">{`Facility: ${reservation.facility.name}`}</Typography>
            <Typography variant="subtitle1">{`Amenity: ${reservation.amenity ? reservation.amenity.name : 'N/A'}`}</Typography>
            <Typography variant="body1">{`Start Time: ${new Date(reservation.startTime).toLocaleString()}`}</Typography>
            <Typography variant="body1">{`End Time: ${new Date(reservation.endTime).toLocaleString()}`}</Typography>
            <Typography variant="body2">{`Status: ${reservation.status[reservation.status.length - 1]}`}</Typography>
            <Typography variant="body2">{`Payment Status: ${reservation.paymentStatus}`}</Typography>
            <Typography variant="body2">{`Total Cost: $${reservation.totalCost}`}</Typography>
            {reservation.notes && <Typography variant="body2">{`Notes: ${reservation.notes}`}</Typography>}
          </Paper>
        </Grid>
      ))}
      
      {pastReservations.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="h5">Past Reservations</Typography>
        </Grid>
      )}
      {pastReservations.map((reservation) => (
        <Grid item xs={12} sm={6} md={4} key={reservation._id}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">{`Facility: ${reservation.facility.name}`}</Typography>
            <Typography variant="subtitle1">{`Amenity: ${reservation.amenity ? reservation.amenity.name : 'N/A'}`}</Typography>
            <Typography variant="body1">{`Start Time: ${new Date(reservation.startTime).toLocaleString()}`}</Typography>
            <Typography variant="body1">{`End Time: ${new Date(reservation.endTime).toLocaleString()}`}</Typography>
            <Typography variant="body2">{`Status: ${reservation.status[reservation.status.length - 1]}`}</Typography>
            <Typography variant="body2">{`Payment Status: ${reservation.paymentStatus}`}</Typography>
            <Typography variant="body2">{`Total Cost: $${reservation.totalCost}`}</Typography>
            {reservation.notes && <Typography variant="body2">{`Notes: ${reservation.notes}`}</Typography>}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserDashboard;
