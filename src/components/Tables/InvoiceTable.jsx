import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const InvoiceTable = ({ rows, shops = [] }) => (
  <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)' }}>
    <Table size="small">
      <TableHead>
        <TableRow sx={{ bgcolor: '#1976d2' }}>
          <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Invoice ID</TableCell>
          <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Customer Number</TableCell>
          <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Shop Name</TableCell>
          <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Amount</TableCell>
          <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Date</TableCell>
          <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Category</TableCell>
          <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow
            key={row.invoiceId}
            sx={{
              bgcolor: idx % 2 === 0 ? '#fafdff' : '#e3f0fc',
              '&:hover': { bgcolor: '#bbdefb' },
              transition: 'background 0.2s',
            }}
          >
            <TableCell>{row.invoiceId}</TableCell>
            <TableCell>
              <Link to={`/customers/${row.customerNumber}`} style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>
                {row.customerNumber}
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`/shops/${row.shopId}`} style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>
                {shops.find(s => s.id === row.shopId)?.name || row.shopId}
              </Link>
            </TableCell>
            <TableCell>{row.amount}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>
              <Chip label={row.category} color="primary" size="small" sx={{ fontWeight: 600, bgcolor: '#1976d2', color: '#fff' }} />
            </TableCell>
            <TableCell>{row.location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default InvoiceTable; 