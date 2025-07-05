import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PercentIcon from '@mui/icons-material/Percent';
import InvoiceStatsCard from '../../components/Cards/InvoiceStatsCard';
import { getDashboardAnalytics, getApiError } from '../../utils/api';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    getDashboardAnalytics()
      .then(res => {
        if (!mounted) return;
        setAnalytics(res.data);
      })
      .catch(err => {
        if (!mounted) return;
        setError(getApiError(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return <Box p={3} textAlign="center"><CircularProgress /></Box>;
  }
  if (error) {
    return <Box p={3}><Alert severity="error">{error}</Alert></Box>;
  }
  if (!analytics) {
    return <Box p={3}><Alert severity="error">No analytics data available.</Alert></Box>;
  }

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight={700} color="#1976d2">
        Dashboard Overview
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Total Invoices" stats={analytics.totalInvoices} icon={ReceiptLongIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Total Revenue" stats={analytics.totalRevenue} icon={AttachMoneyIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Unique Customers" stats={analytics.uniqueCustomers} icon={PeopleAltIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Active Shops" stats={analytics.activeShops} icon={StoreMallDirectoryIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="WhatsApp Delivered" stats={analytics.whatsappDelivered} icon={CheckCircleIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="WhatsApp Not Delivered" stats={analytics.whatsappNotDelivered} icon={CancelIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Avg Invoice Value" stats={analytics.avgInvoiceValue} icon={AttachMoneyIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Invoices per Customer" stats={analytics.invoicesPerCustomer} icon={PeopleAltIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Invoices per Shop" stats={analytics.invoicesPerShop} icon={StoreMallDirectoryIcon} /></Grid>
        {/* The following cards are not directly available in the API response, so you can add them if backend provides them later */}
        {/* <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Top Category" stats={{ allTime: '-', last7Days: '-', today: '-' }} icon={CategoryIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Top Location" stats={{ allTime: '-', last7Days: '-', today: '-' }} icon={LocationOnIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="New Customers (This Month)" stats={{ allTime: '-', last7Days: '-', today: '-' }} icon={PeopleAltIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Shops w/ No Sales Today" stats={{ allTime: '-', last7Days: '-', today: '-' }} icon={StoreMallDirectoryIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Highest Invoice" stats={{ allTime: '-', last7Days: '-', today: '-' }} icon={TrendingUpIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="Lowest Invoice" stats={{ allTime: '-', last7Days: '-', today: '-' }} icon={TrendingDownIcon} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><InvoiceStatsCard label="WhatsApp Delivery Ratio (%)" stats={{ allTime: '-', last7Days: '-', today: '-' }} icon={PercentIcon} /></Grid> */}
      </Grid>
    </Box>
  );
};

export default Dashboard; 