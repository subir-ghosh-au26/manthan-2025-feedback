import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError("Invalid Credentials. Access Denied.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: '#f1f5f9' 
    }}>
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Box sx={{ bgcolor: '#1e3a8a', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <LockIcon sx={{ color: 'white', fontSize: 30 }} />
          </Box>
          
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: '#1e3a8a' }}>
            Admin Login
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Restricted Access
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField 
              fullWidth 
              label="Email Address" 
              variant="outlined" 
              sx={{ mb: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField 
              fullWidth 
              type="password"
              label="Password" 
              variant="outlined" 
              sx={{ mb: 3 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button 
              fullWidth 
              type="submit" 
              variant="contained" 
              size="large"
              disabled={loading}
              sx={{ py: 1.5, fontSize: '1rem' }}
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;