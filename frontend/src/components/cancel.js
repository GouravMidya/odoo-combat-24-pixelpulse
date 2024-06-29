import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const Cancel = ({ message, onRetry }) => {
    return (
        <Container maxWidth="sm">
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center"
                textAlign="center"
                minHeight="100vh"
                bgcolor="background.paper"
                boxShadow={3}
                borderRadius={2}
                p={4}
            >
                <ErrorIcon style={{ fontSize: 80, color: 'red' }} />
                <Typography variant="h4" gutterBottom>
                    Oops!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {message || 'Something went wrong. Please try again.'}
                </Typography>
                <Button variant="contained" color="secondary" onClick={onRetry}>
                    Retry
                </Button>
            </Box>
        </Container>
    );
};

export default Cancel;
