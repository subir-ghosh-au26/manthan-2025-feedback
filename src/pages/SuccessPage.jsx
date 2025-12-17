import React from 'react';
import { Container, Paper, Typography, Button, Box, IconButton, Tooltip, Stack, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SuccessPage = () => {

  // --- CONFIG: UPDATE YOUR LINKS HERE ---
  const socialMedia = [
    { 
      name: "Website", 
      icon: <LanguageIcon fontSize="large" />, 
      url: "https://bipard.bihar.gov.in",
      color: '#AF2910'
    },
    { 
      name: "X", 
      icon: <XIcon fontSize="large" />, 
      url: "https://x.com/BipardGaya",
      color: '#000000'
    },
    { 
      name: "Facebook", 
      icon: <FacebookIcon fontSize="large" />, 
      url: "https://www.facebook.com/bipard/",
      color: '#1877f2' 
    },
    { 
      name: "LinkedIn", 
      icon: <LinkedInIcon fontSize="large" />, 
      url: "https://www.linkedin.com/company/bipard-bihar-institute-of-public-administration-rural-development-bipard-gaya/?viewAsMember=true",
      color: '#0a66c2' 
    },
    { 
      name: "Instagram", 
      icon: <InstagramIcon fontSize="large" />, 
      url: "https://www.instagram.com/bipard_gaya_jee?igsh=MWJiN3B0eGJpNXdicA==",
      color: '#e1306c' 
    }
  ];

  return (
    <>
      <Navbar />
      <Box 
        sx={{ 
          minHeight: '90vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: '#f8fafc' 
        }}
      >
        <Container maxWidth="sm">
          <Paper 
            elevation={4} 
            sx={{ 
              p: 6, 
              textAlign: 'center', 
              borderRadius: 4,
              borderTop: '6px solid #166534'
            }}
          >
            {/* Success Animation Icon */}
            <Box sx={{ mb: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 90, color: '#166534' }} />
            </Box>

            <Typography variant="h4" fontWeight="800" color="#1e3a8a" gutterBottom>
              Submission Received
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5, lineHeight: 1.6 }}>
              Thank you for your valuable insights. Your response has been securely recorded and will contribute to the improvement of training practices.
            </Typography>

            <Divider sx={{ mb: 4 }}>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Stay Connected
              </Typography>
            </Divider>

            {/* Social Media Icons */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 5 }}>
              {socialMedia.map((item) => (
                <Tooltip title={item.name} key={item.name} arrow>
                  <IconButton 
                    component="a" 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                      color: item.color, 
                      bgcolor: '#eff6ff', 
                      border: '1px solid #dbeafe',
                      width: 50,
                      height: 50,
                      transition: 'all 0.2s',
                      '&:hover': { 
                        bgcolor: item.color, 
                        color: 'white',
                        transform: 'translateY(-3px)',
                        boxShadow: 3
                      } 
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>

          </Paper>

          {/* Footer Copyright */}
          <Typography variant="caption" display="block" align="center" color="text.disabled" sx={{ mt: 4 }}>
            © {new Date().getFullYear()} BIPARD. All rights reserved.
          </Typography>

        </Container>
      </Box>
    </>
  );
};

export default SuccessPage;