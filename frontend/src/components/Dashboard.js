// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, Chip, List, ListItem, ListItemText } from '@mui/material';
import { getFacility } from '../utils/facility';

function Dashboard() {
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const data = await getFacility('667fb9d31bcbf5bbb9a7e7da'); // Replace with actual ID
        setFacility(data);
      } catch (error) {
        console.error('Error fetching facility:', error);
      }
    };
    fetchFacility();
  }, []);

  if (!facility) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Facility Dashboard
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">{facility.name}</Typography>
              <Typography variant="body1">{facility.description}</Typography>
              <Typography variant="body2">Type: {facility.type}</Typography>
              <Typography variant="body2">Business Type: {facility.business_type}</Typography>
              <Typography variant="body2">Capacity: {facility.capacity}</Typography>
              <Typography variant="body2">Hourly Rate: ${facility.hourlyRate}</Typography>
              <Chip label={facility.isActive ? 'Active' : 'Inactive'} color={facility.isActive ? 'success' : 'error'} sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Availability Schedule</Typography>
              <List dense>
                {Object.entries(facility.availabilitySchedule).map(([day, schedule]) => (
                  <ListItem key={day}>
                    <ListItemText
                      primary={`${day.charAt(0).toUpperCase() + day.slice(1)}`}
                      secondary={`Open: ${schedule.open}, Close: ${schedule.close}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Dashboard;