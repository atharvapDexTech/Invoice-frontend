import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

const colorMap = {
  'Total Invoices': '#1976d2',
  'Total Revenue': '#2e7d32',
  'Unique Customers': '#0288d1',
  'Active Shops': '#512da8',
  'WhatsApp Delivered': '#43a047',
  'WhatsApp Not Delivered': '#e53935',
};

const InvoiceStatsCard = ({ label, stats, icon: Icon, iconColor }) => (
  <Card
    elevation={4}
    sx={{
      minHeight: 130,
      borderRadius: 3,
      transition: 'box-shadow 0.2s',
      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
      '&:hover': { boxShadow: '0 4px 16px rgba(25, 118, 210, 0.18)' },
      background: '#fff',
      p: 1.5,
    }}
  >
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2}>
        {Icon && (
          <Box
            sx={{
              bgcolor: iconColor || colorMap[label] || '#1976d2',
              color: '#fff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
            }}
          >
            <Icon fontSize="inherit" />
          </Box>
        )}
        <Box flex={1}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom fontWeight={600} fontSize={15}>
            {label}
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack>
              <Typography variant="h4" fontWeight="bold" color={colorMap[label] || 'primary'}>
                {stats.allTime}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                All Time
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h6" fontWeight="bold">
                {stats.last7Days}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Last 7 Days
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h6" fontWeight="bold">
                {stats.today}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Today
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default InvoiceStatsCard; 