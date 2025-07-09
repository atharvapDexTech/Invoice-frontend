import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, CircularProgress, Link, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import LoginIllustration from '../logo.svg'; // Use logo as illustration for now

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await login(username, password);
      const { token, user } = res.data;
      localStorage.setItem('jwt', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);
      if (user.role === 'business' && user.shopId) {
        localStorage.setItem('shopId', user.shopId);
      }
      if (user.role === 'admin') {
        navigate('/');
      } else if (user.role === 'business') {
        navigate('/business-dashboard');
      } else {
        setError('Unknown user role.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotOpen(true);
    setTimeout(() => setForgotOpen(false), 2500);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f6f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', maxWidth: 900, width: '100%', borderRadius: 4, overflow: 'hidden' }}>
        {/* Left Side: Illustration & Welcome */}
        <Box sx={{ bgcolor: '#1976d2', color: '#fff', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, minWidth: isMobile ? '100%' : 350 }}>
          <img src={LoginIllustration} alt="Welcome" style={{ width: 120, marginBottom: 24 }} />
          <Typography variant="h4" fontWeight={700} mb={2} textAlign="center">
            Welcome to InvoicePro
          </Typography>
          <Typography variant="body1" textAlign="center" mb={2}>
            Manage your business, invoices, and analytics with ease.
          </Typography>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Dexterrr Tech
          </Typography>
        </Box>
        {/* Right Side: Login Form */}
        <Box sx={{ flex: 1, p: { xs: 3, sm: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" fontWeight={700} color="#1976d2" mb={3} textAlign="center">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} mb={2}>
              <Link href="#" underline="hover" color="primary" fontWeight={600} onClick={handleForgotPassword}>
                Forgot password?
              </Link>
            </Box>
            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
            {forgotOpen && <Alert severity="info" sx={{ mt: 1 }}>Password reset link feature coming soon!</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, fontWeight: 700, minHeight: 48, fontSize: 18, letterSpacing: 1 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
} 