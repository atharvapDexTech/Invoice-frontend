import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function BusinessProfile() {
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa' }}>
      <Typography variant="h4" fontWeight={700} color="#1976d2" mb={3}>
        Business Profile & Settings
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="body1">Profile info and settings form will appear here.</Typography>
      </Paper>
    </Box>
  );
} 