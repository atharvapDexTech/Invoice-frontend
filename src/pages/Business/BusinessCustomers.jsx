import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const MOCK_CUSTOMERS = [
  { name: 'John Doe', phone: '9876543210', totalSpent: 1450, categories: ['Grocery', 'Electronics'], locations: ['Andheri', 'Bandra'] },
  { name: 'Jane Smith', phone: '9123456789', totalSpent: 800, categories: ['Clothing'], locations: ['Pune'] },
  { name: 'Alice Brown', phone: '9988776655', totalSpent: 1500, categories: ['Grocery', 'Clothing'], locations: ['Andheri', 'Pune'] },
];

export default function BusinessCustomers() {
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa' }}>
      <Typography variant="h4" fontWeight={700} color="#1976d2" mb={3}>
        Customers
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Total Spent</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Locations Visited</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_CUSTOMERS.map(cust => (
                <TableRow key={cust.phone}>
                  <TableCell>{cust.name}</TableCell>
                  <TableCell>{cust.phone}</TableCell>
                  <TableCell>₹{cust.totalSpent}</TableCell>
                  <TableCell>{cust.categories.map(cat => <Chip key={cat} label={cat} size="small" sx={{ mr: 0.5 }} />)}</TableCell>
                  <TableCell>{cust.locations.map(loc => <Chip key={loc} label={loc} size="small" sx={{ mr: 0.5 }} />)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
} 