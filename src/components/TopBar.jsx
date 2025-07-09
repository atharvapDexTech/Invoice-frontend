import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ onToggleSidebar, showSidebarToggle }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <AppBar position="fixed" sx={{ bgcolor: '#1565c0', minHeight: 48, zIndex: (theme) => theme.zIndex.drawer + 2 }}>
      <Toolbar sx={{ minHeight: 48, display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          {showSidebarToggle && (
            <IconButton color="inherit" edge="start" onClick={onToggleSidebar} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" fontWeight={700} noWrap>
            InvoicePro
          </Typography>
        </Box>
        <Box>
          {role && (
            <>
              <Typography variant="subtitle2" color="inherit" component="span" sx={{ mr: 2 }}>
                {username ? `Logged in as: ${username}` : ''} {role ? `(${role})` : ''}
              </Typography>
              <Button color="inherit" size="small" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 