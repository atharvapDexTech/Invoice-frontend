import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button, CircularProgress, Alert } from '@mui/material';
import InvoiceTable from '../../components/Tables/InvoiceTable';
import { getShop, getInvoices, getShops, getApiError } from '../../utils/api';

const ShopPage = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [shopInvoices, setShopInvoices] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    Promise.all([
      getShop(shopId),
      getInvoices(),
      getShops()
    ])
      .then(([shopRes, invoicesRes, shopsRes]) => {
        if (!mounted) return;
        setShop(shopRes.data);
        const invoices = invoicesRes.data.filter(inv => inv.shopId === shopId);
        setShopInvoices(invoices);
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
  }, [shopId]);

  if (loading) {
    return <Box p={3} textAlign="center"><CircularProgress /></Box>;
  }
  if (error) {
    return <Box p={3}><Alert severity="error">{error}</Alert></Box>;
  }
  if (!shop) {
    return <Box p={3}><Typography variant="h5">Shop not found.</Typography></Box>;
  }

  const totalRevenue = shopInvoices.reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);
  const uniqueCustomers = new Set(shopInvoices.map(inv => inv.customerNumber)).size;
  const categories = Array.from(new Set(shopInvoices.map(inv => inv.category)));

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa', minHeight: '100vh' }}>
      <Button component={Link} to="/analytics" variant="outlined" sx={{ mb: 2 }}>
        &larr; Back to Analytics
      </Button>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} color="#1976d2" gutterBottom>
          Shop: {shop.name}
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={3}><Typography><b>Location:</b> {shop.location || (shop.city && shop.state ? `${shop.city}, ${shop.state}` : shop.city || shop.state || '')}</Typography></Grid>
          <Grid item xs={12} sm={6} md={3}><Typography><b>Category:</b> {shop.category}</Typography></Grid>
          <Grid item xs={12} sm={6} md={3}><Typography><b>Total Revenue:</b> ₹{totalRevenue.toLocaleString()}</Typography></Grid>
          <Grid item xs={12} sm={6} md={3}><Typography><b>Unique Customers:</b> {uniqueCustomers}</Typography></Grid>
          <Grid item xs={12} sm={6} md={3}><Typography><b>Categories:</b> {categories.join(', ')}</Typography></Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>All Invoices for {shop.name}</Typography>
        <InvoiceTable rows={shopInvoices} shops={shops} />
      </Paper>
    </Box>
  );
};

export default ShopPage; 