import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SuccessPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
        <Paper elevation={0} sx={{ p: 6, bgcolor: 'transparent' }}>
          <CheckCircleIcon sx={{ fontSize: 100, color: 'green', mb: 2 }} />
          <Typography variant="h3" fontWeight="bold" gutterBottom>Thank You!</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Your feedback has been securely recorded.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default SuccessPage;