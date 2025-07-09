import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const MOCK_CREDITS = [
  { customer: 'John Doe', amount: 1200, dueDate: '2024-07-10' },
  { customer: 'Jane Smith', amount: 800, dueDate: '2024-07-12' },
  { customer: 'Alice Brown', amount: 1500, dueDate: '2024-07-15' },
];

export default function BusinessCredits() {
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa' }}>
      <Typography variant="h4" fontWeight={700} color="#1976d2" mb={3}>
        Credit Reminders
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_CREDITS.map(credit => (
                <TableRow key={credit.customer}>
                  <TableCell>{credit.customer}</TableCell>
                  <TableCell>₹{credit.amount}</TableCell>
                  <TableCell>{credit.dueDate}</TableCell>
                  <TableCell><Chip label="Send Reminder" color="primary" clickable /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
} 