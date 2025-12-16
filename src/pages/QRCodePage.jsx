import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Navbar from '../components/Navbar';

const QRCodePage = () => {
  const [url, setUrl] = useState('');
  const qrRef = useRef(null);
  const qrCode = useRef(null);

  useEffect(() => {
    // 1. Get the live URL (or localhost)
    const currentUrl = window.location.origin;
    setUrl(currentUrl);

    // 2. Configure the QR Style to match your reference image
    qrCode.current = new QRCodeStyling({
      width: 350,
      height: 350,
      type: "svg",
      data: currentUrl,
      image: "/logo.png",
      dotsOptions: {
        color: "#002a5c",
        type: "rounded"
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
        imageSize: 0.5
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#002a5c"
      },
      cornersDotOptions: {
        type: "dot",
        color: "#002a5c"
      }
    });

    // 3. Append to the DOM
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }

  }, []);

  const handleDownload = () => {
    qrCode.current.download({ name: "feedback-qr-code", extension: "png" });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 8, mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* The Card */}
        <Paper 
          elevation={6} 
          sx={{ 
            p: 6, 
            borderRadius: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            bgcolor: 'white',
            maxWidth: '500px',
            width: '100%'
          }}
        >
          {/* Header Text */}
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              fontFamily: 'serif',
              fontWeight: 'bold', 
              color: '#002a5c',
              mb: 4
            }}
          >
            Scan to Submit Feedback
          </Typography>

          {/* QR Code Container */}
          <Box 
            ref={qrRef} 
            sx={{ 
              mb: 4,
              '& svg': { display: 'block' }
            }} 
          />

          {/* Footer Text */}
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Point your camera at the code above to access the official feedback portal.
          </Typography>

          {/* Download Button */}
          <Button 
            variant="contained" 
            size="large" 
            startIcon={<DownloadIcon />} 
            onClick={handleDownload}
            sx={{ 
              bgcolor: '#002a5c', 
              borderRadius: 2,
              px: 4,
              '&:hover': { bgcolor: '#001e42' }
            }}
          >
            Download High-Res PNG
          </Button>

          {/* Direct Link Display */}
          <Box sx={{ mt: 4, p: 2, bgcolor: '#f1f5f9', borderRadius: 2, width: '100%', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">Direct URL:</Typography>
            <Typography variant="body2" fontWeight="medium" color="#002a5c" sx={{ wordBreak: 'break-all' }}>
              {url}
            </Typography>
          </Box>

        </Paper>
      </Container>
    </>
  );
};

export default QRCodePage;