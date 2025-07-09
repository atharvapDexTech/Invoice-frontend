import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Stack, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Skeleton, Avatar, Divider } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CampaignIcon from '@mui/icons-material/Campaign';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import PersonIcon from '@mui/icons-material/Person';
import { getInvoices, getShops, getCustomers } from '../../utils/api';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Card sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
            <Icon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
            <Typography variant="h5" fontWeight={700}>{value}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function BusinessDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const shopId = localStorage.getItem('shopId');
    if (!shopId) {
      setError('No shop ID found. Please log in again.');
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      getInvoices(),
      getCustomers(),
      getShops(),
    ])
      .then(([invRes, custRes, shopsRes]) => {
        const allInvoices = invRes.data || [];
        const allCustomers = custRes.data || [];
        const allShops = shopsRes.data || [];
        setShop(allShops.find(s => s.id === shopId));
        setInvoices(allInvoices.filter(inv => inv.shopId === shopId));
        setCustomers(allCustomers); // Optionally filter by shop if needed
      })
      .catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa' }}>
      {/* Shop Summary Card */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
        {shop ? (
          <>
            <Avatar sx={{ bgcolor: '#1976d2', width: 64, height: 64, fontSize: 32 }}>
              <StoreMallDirectoryIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700} color="#1976d2">
                Welcome, {shop.name}!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {shop.location}
              </Typography>
            </Box>
          </>
        ) : (
          <Skeleton variant="rectangular" width={300} height={64} />
        )}
      </Paper>

      {/* Stat Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4} md={4}>
          {loading ? <Skeleton variant="rectangular" height={90} /> : <StatCard icon={AttachMoneyIcon} label="Total Sales" value={`₹${shop?.totalSales || 0}`} color="#1976d2" />}
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          {loading ? <Skeleton variant="rectangular" height={90} /> : <StatCard icon={ShoppingCartIcon} label="Total Quantity" value={shop?.totalQuantity || 0} color="#43a047" />}
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          {loading ? <Skeleton variant="rectangular" height={90} /> : <StatCard icon={WhatsAppIcon} label="WhatsApp Sent" value={shop?.totalWhatsAppSent || 0} color="#25d366" />}
        </Grid>
      </Grid>

      {/* Section: Advertisers & Credit Reminders */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, minHeight: 180 }}>
            <Typography variant="h6" color="#1976d2" fontWeight={700} mb={2}>
              Companies Advertising With You
            </Typography>
            <Stack spacing={1}>
              {loading ? (
                <Skeleton variant="rectangular" height={40} />
              ) : customers.length === 0 ? (
                <Alert severity="info">No advertisers yet.</Alert>
              ) : (
                customers.map(cust => (
                  <Chip key={cust.id} icon={<CampaignIcon />} label={`${cust.name} (since ${cust.since})`} color="primary" variant="outlined" />
                ))
              )}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, minHeight: 180 }}>
            <Typography variant="h6" color="#1976d2" fontWeight={700} mb={2}>
              Credit Bill Reminders
            </Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={120} />
            ) : customers.length === 0 ? (
              <Alert severity="info">No outstanding credits!</Alert>
            ) : (
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
                    {customers.map(cust => (
                      <TableRow key={cust.id}>
                        <TableCell>{cust.name}</TableCell>
                        <TableCell>₹{cust.creditAmount || 0}</TableCell>
                        <TableCell>{cust.creditDueDate || 'N/A'}</TableCell>
                        <TableCell><Chip label="Send Reminder" color="primary" clickable /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Section: Customer-wise Invoice History */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" color="#1976d2" fontWeight={700} mb={2}>
          Customer-wise Invoice History
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" height={120} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : invoices.length === 0 ? (
          <Alert severity="info">No invoices found for your shop.</Alert>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map(inv => (
                  <TableRow key={inv.invoiceId}>
                    <TableCell>{inv.customerNumber}</TableCell>
                    <TableCell>{inv.invoiceId}</TableCell>
                    <TableCell>₹{inv.amount}</TableCell>
                    <TableCell>{inv.date}</TableCell>
                    <TableCell>{inv.category}</TableCell>
                    <TableCell>{inv.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
} 