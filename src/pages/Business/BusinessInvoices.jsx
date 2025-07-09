import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const MOCK_INVOICES = [
  { invoiceId: 'INV001', customer: 'John Doe', amount: 1200, date: '2024-07-01', category: 'Grocery', location: 'Andheri' },
  { invoiceId: 'INV002', customer: 'Jane Smith', amount: 800, date: '2024-07-02', category: 'Electronics', location: 'Bandra' },
  { invoiceId: 'INV003', customer: 'Alice Brown', amount: 1500, date: '2024-07-03', category: 'Clothing', location: 'Pune' },
];

export default function BusinessInvoices() {
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa' }}>
      <Typography variant="h4" fontWeight={700} color="#1976d2" mb={3}>
        Invoices
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_INVOICES.map(inv => (
                <TableRow key={inv.invoiceId}>
                  <TableCell>{inv.invoiceId}</TableCell>
                  <TableCell>{inv.customer}</TableCell>
                  <TableCell>₹{inv.amount}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>{inv.category}</TableCell>
                  <TableCell>{inv.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
} 