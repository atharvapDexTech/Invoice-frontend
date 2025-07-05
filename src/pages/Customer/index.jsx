import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button, CircularProgress, Alert } from '@mui/material';
import InvoiceTable from '../../components/Tables/InvoiceTable';
import { getCustomer, getInvoices, getShops, getApiError } from '../../utils/api';

const CustomerPage = () => {
  const { customerNumber } = useParams();
  const [customer, setCustomer] = useState(null);
  const [customerInvoices, setCustomerInvoices] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    Promise.all([
      getCustomer(customerNumber),
      getInvoices(),
      getShops()
    ])
      .then(([customerRes, invoicesRes, shopsRes]) => {
        if (!mounted) return;
        setCustomer(customerRes.data);
        const invoices = invoicesRes.data.filter(inv => inv.customerNumber === customerNumber);
        setCustomerInvoices(invoices);
        // Map city/state to location for shops
        const mappedShops = (shopsRes.data || []).map(shop => ({
          ...shop,
          location: shop.city && shop.state ? `${shop.city}, ${shop.state}` : shop.city || shop.state || '',
        }));
        setShops(mappedShops);
      })
      .catch(err => {
        if (!mounted) return;
        setError(getApiError(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [customerNumber]);

  if (loading) {
    return <Box p={3} textAlign="center"><CircularProgress /></Box>;
  }
  if (error) {
    return <Box p={3}><Alert severity="error">{error}</Alert></Box>;
  }
  if (!customer) {
    return <Box p={3}><Typography variant="h5">Customer not found.</Typography></Box>;
  }

  const totalSpent = customerInvoices.reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);
  const categories = Array.from(new Set(customerInvoices.map(inv => inv.category)));
  const locations = Array.from(new Set((customer.locationsVisited || [])));

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa', minHeight: '100vh' }}>
      <Button component={Link} to="/analytics" variant="outlined" sx={{ mb: 2 }}>
        &larr; Back to Analytics
      </Button>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} color="#1976d2" gutterBottom>
          Customer: {customerNumber}
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={3}><Typography><b>Total Spent:</b> ₹{totalSpent.toLocaleString()}</Typography></Grid>
          <Grid item xs={12} sm={6} md={3}><Typography><b>Invoices:</b> {customerInvoices.length}</Typography></Grid>
          <Grid item xs={12} sm={6} md={3}><Typography><b>Categories:</b> {categories.join(', ')}</Typography></Grid>
          <Grid item xs={12} sm={6} md={3}><Typography><b>Locations:</b> {locations.join(', ')}</Typography></Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>All Invoices for {customerNumber}</Typography>
        <InvoiceTable rows={customerInvoices} shops={shops} />
      </Paper>
    </Box>
  );
};

export default CustomerPage; 