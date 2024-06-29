import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = ({ message, onBack }) => {
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
                <CheckCircleIcon style={{ fontSize: 80, color: 'green' }} />
                <Typography variant="h4" gutterBottom>
                    Success!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {message || 'Your payment was successful.'}
                </Typography>
                <Button variant="contained" color="primary" onClick={onBack}>
                    Go Back
                </Button>
            </Box>
        </Container>
    );
};

export default Success;
