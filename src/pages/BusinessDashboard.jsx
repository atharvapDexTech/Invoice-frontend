import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Stack, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CampaignIcon from '@mui/icons-material/Campaign';
import { getInvoices, getShops, getCustomers } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const MOCK_DAY_STATS = {
  totalSales: 12500,
  totalQuantity: 87,
  totalWhatsAppSent: 34,
};
const MOCK_ADVERTISERS = [
  { id: 'c1', name: 'Acme Corp', since: '2024-07-01' },
  { id: 'c2', name: 'Beta Ltd', since: '2024-07-05' },
];
const MOCK_CREDIT_REMINDERS = [
  { customer: 'John Doe', amount: 1200, dueDate: '2024-07-10' },
  { customer: 'Jane Smith', amount: 800, dueDate: '2024-07-12' },
];

export default function BusinessDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('shopId');
    navigate('/login');
  };

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
    // <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa', minHeight: '100vh' }}>
    //   <Box display="flex" justifyContent="flex-end" mb={2}>
    //     <Button variant="outlined" color="primary" onClick={handleLogout}>Logout</Button>
    //   </Box>
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={700} color="#1976d2" mb={1}>
        Business Dashboard
      </Typography>
      {shop && (
        <Typography variant="h6" color="text.secondary" mb={3}>
          {shop.name} ({shop.location})
        </Typography>
      )}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e3f0fc' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AttachMoneyIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="h6">Total Sales</Typography>
                  <Typography variant="h5" fontWeight={700}>₹{MOCK_DAY_STATS.totalSales}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e3f0fc' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <ShoppingCartIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="h6">Total Quantity</Typography>
                  <Typography variant="h5" fontWeight={700}>{MOCK_DAY_STATS.totalQuantity}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e3f0fc' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <WhatsAppIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="h6">WhatsApp Sent</Typography>
                  <Typography variant="h5" fontWeight={700}>{MOCK_DAY_STATS.totalWhatsAppSent}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" color="#1976d2" fontWeight={700} mb={2}>
              Companies Advertising With You
            </Typography>
            <Stack spacing={1}>
              {MOCK_ADVERTISERS.map(ad => (
                <Chip key={ad.id} icon={<CampaignIcon />} label={`${ad.name} (since ${ad.since})`} color="primary" variant="outlined" />
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" color="#1976d2" fontWeight={700} mb={2}>
              Credit Bill Reminders
            </Typography>
            {MOCK_CREDIT_REMINDERS.length === 0 ? (
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
                    {MOCK_CREDIT_REMINDERS.map(rem => (
                      <TableRow key={rem.customer}>
                        <TableCell>{rem.customer}</TableCell>
                        <TableCell>₹{rem.amount}</TableCell>
                        <TableCell>{rem.dueDate}</TableCell>
                        <TableCell><Button size="small" variant="contained" color="primary">Send Reminder</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" color="#1976d2" fontWeight={700} mb={2}>
          Customer-wise Invoice History
        </Typography>
        {loading ? (
          <Alert severity="info">Loading...</Alert>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
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