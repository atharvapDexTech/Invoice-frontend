import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function Reports() {
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight={700} color="#1976d2">
        Reports & Analytics
      </Typography>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="body1">Reports and analytics will appear here.</Typography>
      </Paper>
    </Box>
  );
} 