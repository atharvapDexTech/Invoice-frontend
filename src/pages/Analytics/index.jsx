import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Grid, Paper, Button, Stack, Divider, CircularProgress, Alert } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CategoryIcon from '@mui/icons-material/Category';
import InvoiceStatsCard from '../../components/Cards/InvoiceStatsCard';
import ShopFilter from '../../components/Filters/ShopFilter';
import CustomerFilter from '../../components/Filters/CustomerFilter';
import InvoiceTable from '../../components/Tables/InvoiceTable';
import { exportToExcel } from '../../utils/exportToExcel';
import { getInvoices, getShops, getCustomers, getApiError } from '../../utils/api';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box pt={2}>{children}</Box>}
    </div>
  );
}

const SectionHeader = ({ children }) => (
  <Box mb={1} mt={2} display="flex" alignItems="center">
    <Box width={4} height={28} bgcolor="#1976d2" borderRadius={2} mr={1} />
    <Typography variant="h6" fontWeight={700} color="#1976d2">{children}</Typography>
  </Box>
);

const Analytics = () => {
  const [tab, setTab] = useState(0);
  const [shopFilters, setShopFilters] = useState({});
  const [customerFilters, setCustomerFilters] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [shops, setShops] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    Promise.all([
      getInvoices(),
      getShops(),
      getCustomers()
    ])
      .then(([invoicesRes, shopsRes, customersRes]) => {
        if (!mounted) return;
        // Map invoices: combine city/state to location, convert amount to number
        const mappedInvoices = (invoicesRes.data || []).map(inv => ({
          ...inv,
          location: inv.city && inv.state ? `${inv.city}, ${inv.state}` : inv.city || inv.state || '',
          amount: Number(inv.amount),
        }));
        // Map shops: combine city/state to location
        const mappedShops = (shopsRes.data || []).map(shop => ({
          ...shop,
          location: shop.city && shop.state ? `${shop.city}, ${shop.state}` : shop.city || shop.state || '',
        }));
        setInvoices(mappedInvoices);
        setShops(mappedShops);
        setCustomers(customersRes.data);
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

  // --- Robust Filtering Helpers --- //
  const ciMatch = (a, b) => (a || '').toString().toLowerCase() === (b || '').toString().toLowerCase();
  const ciIncludes = (a, b) => (a || '').toString().toLowerCase().includes((b || '').toString().toLowerCase());

  // Shop Analytics Filtering
  const filterInvoices = (filters) => {
    return invoices.filter(inv => {
      if (filters.shopName && !ciMatch(shops.find(s => s.id === inv.shopId)?.name, filters.shopName)) return false;
      if (filters.location && !ciIncludes(inv.location, filters.location)) return false;
      if (filters.category && !ciMatch(inv.category, filters.category)) return false;
      if (filters.purchaseDate && inv.date !== filters.purchaseDate) return false;
      return true;
    });
  };

  // Customer Analytics Filtering
  const filterCustomers = (filters) => {
    return customers.filter(cust => {
      if (filters.customerNumber && !ciMatch(cust.phoneNumber, filters.customerNumber)) return false;
      if (filters.location && !(cust.locationsVisited || []).some(loc => ciMatch(loc, filters.location))) return false;
      return true;
    });
  };

  const filterInvoicesByCustomer = (filters) => {
    return invoices.filter(inv => {
      if (filters.customerNumber && !ciMatch(inv.customerNumber, filters.customerNumber)) return false;
      if (filters.location && !ciIncludes(inv.location, filters.location)) return false;
      if (filters.category && !ciMatch(inv.category, filters.category)) return false;
      if (filters.purchaseDate && inv.date !== filters.purchaseDate) return false;
      return true;
    });
  };

  // Shop Analytics
  const filteredInvoices = filterInvoices(shopFilters);
  const shopKpis = [
    { label: 'Total Invoices', value: filteredInvoices.length, icon: ReceiptLongIcon },
    { label: 'Total Revenue', value: filteredInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0), icon: AttachMoneyIcon },
    { label: 'Unique Customers', value: new Set(filteredInvoices.map(inv => inv.customerNumber)).size, icon: PeopleAltIcon },
    { label: 'Active Shops', value: new Set(filteredInvoices.map(inv => inv.shopId)).size, icon: StoreMallDirectoryIcon },
  ];

  // Customer Analytics
  const filteredCustomers = filterCustomers(customerFilters);
  const filteredCustomerInvoices = filterInvoicesByCustomer(customerFilters);
  const customerKpis = [
    { label: 'Total Customers', value: filteredCustomers.length, icon: PeopleAltIcon },
    { label: 'Total Purchases', value: filteredCustomerInvoices.length, icon: ReceiptLongIcon },
    { label: 'Total Spent', value: filteredCustomerInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0), icon: AttachMoneyIcon },
    { label: 'Categories', value: Array.from(new Set(filteredCustomerInvoices.map(inv => inv.category))).length, icon: CategoryIcon },
  ];

  // Export handlers
  const handleExportShop = () => {
    exportToExcel(filteredInvoices, 'shop_invoices.xlsx');
  };
  const handleExportCustomer = () => {
    exportToExcel(filteredCustomerInvoices, 'customer_purchases.xlsx');
  };

  // Clear Filters handlers
  const handleClearShopFilters = () => setShopFilters({});
  const handleClearCustomerFilters = () => setCustomerFilters({});

  if (loading) {
    return <Box p={3} textAlign="center"><CircularProgress /></Box>;
  }
  if (error) {
    return <Box p={3}><Alert severity="error">{error}</Alert></Box>;
  }

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight={700} color="#1976d2">
        Analytics
      </Typography>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="analytics tabs" textColor="primary" indicatorColor="primary">
          <Tab label="Shop Analytics" />
          <Tab label="Customer Analytics" />
        </Tabs>
        {/* Shop Analytics Tab */}
        <TabPanel value={tab} index={0}>
          <SectionHeader>Shop Filters</SectionHeader>
          <Paper sx={{ p: 2, mb: 3, bgcolor: '#fafdff' }} elevation={0}>
            <ShopFilter filters={shopFilters} onChange={setShopFilters} shops={shops} invoices={invoices} />
          </Paper>
          <SectionHeader>Shop KPIs</SectionHeader>
          <Grid container spacing={2} mb={2}>
            {/* Only show relevant KPIs for filtered data */}
            <Grid item xs={12} sm={4} md={3}>
              <InvoiceStatsCard label="Total Purchases" stats={{ allTime: filteredInvoices.length }} icon={ReceiptLongIcon} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InvoiceStatsCard label="Total Spent" stats={{ allTime: filteredInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0) }} icon={AttachMoneyIcon} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InvoiceStatsCard label="Categories" stats={{ allTime: Array.from(new Set(filteredInvoices.map(inv => inv.category))).length }} icon={CategoryIcon} />
            </Grid>
          </Grid>
          <SectionHeader>Invoices</SectionHeader>
          <Stack direction="row" justifyContent="flex-end" mb={1}>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportShop} size="small">
              Export
            </Button>
          </Stack>
          {filteredInvoices.length === 0 ? (
            <Alert severity="info">No results found for the selected filters.</Alert>
          ) : (
            <InvoiceTable rows={filteredInvoices} shops={shops} />
          )}
        </TabPanel>
        {/* Customer Analytics Tab */}
        <TabPanel value={tab} index={1}>
          <SectionHeader>Customer Filters</SectionHeader>
          <Paper sx={{ p: 2, mb: 3, bgcolor: '#fafdff' }} elevation={0}>
            <CustomerFilter filters={customerFilters} onChange={setCustomerFilters} customers={customers} invoices={invoices} />
          </Paper>
          <SectionHeader>Customer KPIs</SectionHeader>
          <Grid container spacing={2} mb={2}>
            {/* Only show relevant KPIs for filtered data */}
            <Grid item xs={12} sm={4} md={3}>
              <InvoiceStatsCard label="Total Purchases" stats={{ allTime: filteredCustomerInvoices.length }} icon={ReceiptLongIcon} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InvoiceStatsCard label="Total Spent" stats={{ allTime: filteredCustomerInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0) }} icon={AttachMoneyIcon} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InvoiceStatsCard label="Categories" stats={{ allTime: Array.from(new Set(filteredCustomerInvoices.map(inv => inv.category))).length }} icon={CategoryIcon} />
            </Grid>
          </Grid>
          <SectionHeader>Purchases</SectionHeader>
          <Stack direction="row" justifyContent="flex-end" mb={1}>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportCustomer} size="small">
              Export
            </Button>
          </Stack>
          {filteredCustomerInvoices.length === 0 ? (
            <Alert severity="info">No results found for the selected filters.</Alert>
          ) : (
            <InvoiceTable rows={filteredCustomerInvoices} shops={shops} />
          )}
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Analytics; 