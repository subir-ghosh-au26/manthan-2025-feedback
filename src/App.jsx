import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';


import SurveyPage from './pages/SurveyPage';
import SuccessPage from './pages/SuccessPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';


const AdminPage = lazy(() => import('./pages/AdminPage'));
const QRCodePage = lazy(() => import('./pages/QRCodePage'));


const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress size={60} thickness={4} />
  </Box>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes - Fast Load */}
          <Route path="/" element={<SurveyPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes - Lazy Load */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
          
          <Route path="/qr" element={
            <ProtectedRoute>
              <QRCodePage />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;