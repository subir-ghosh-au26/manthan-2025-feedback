import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <AppBar position="sticky" elevation={4} sx={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #1e40af 100%)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          
          {/* --- LOGO REPLACEMENT --- */}
          <Box
            component="img"
            src="/logo.png"
            alt="Org Logo"
            sx={{
              height: { xs: 40, md: 50 }, // 40px on mobile, 50px on desktop
              width: 'auto',
              mr: 2,
              // Optional: Add a white glow/background if your logo is dark
              // bgcolor: 'rgba(255,255,255,0.9)', 
              // borderRadius: '50%',
              // p: 0.5 
            }}
          />
          {/* ------------------------ */}

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap sx={{ lineHeight: 1, fontWeight: 'bold' }}>
              Manthan 2025
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8, letterSpacing: 1, display: 'block' }}>
              IAS FEEDBACK PORTAL
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {/* Public Link */}
            <Button
              component={Link}
              to="/"
              sx={{ 
                color: 'white', 
                backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'transparent',
                display: { xs: 'none', sm: 'block' } // Hide "Survey" text on very small phones if needed
              }}
            >
              Survey
            </Button>

            {/* Admin Only Links */}
            {user && (
              <>
                <Button
                  component={Link}
                  to="/admin"
                  sx={{ color: 'white', backgroundColor: location.pathname === '/admin' ? 'rgba(255,255,255,0.2)' : 'transparent' }}
                >
                  Admin
                </Button>
                <Button
                  component={Link}
                  to="/qr"
                  sx={{ color: 'white', backgroundColor: location.pathname === '/qr' ? 'rgba(255,255,255,0.2)' : 'transparent' }}
                >
                  QR
                </Button>
                <Button 
                  onClick={handleLogout}
                  sx={{ color: '#fda4af', ml: 1, minWidth: 'auto' }}
                >
                  <LogoutIcon />
                </Button>
              </>
            )}
            
            {/* Login Link */}
            {!user && location.pathname !== '/login' && (
               <Button component={Link} to="/login" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                 Login
               </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;