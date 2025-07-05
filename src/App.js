import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import { AppBar, Toolbar, Typography, Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import LineChart from './components/Charts/LineChart';
import BarChart from './components/Charts/BarChart';
import PieChart from './components/Charts/PieChart';
import InvoiceTable from './components/Tables/InvoiceTable';
import invoices from './data/invoices.json';
import shops from './data/shops.json';
import CustomerPage from './pages/Customer';
import ShopPage from './pages/Shop';
import OnboardBusiness from './pages/OnboardBusiness';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

const drawerWidth = 220;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
  { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Onboard Business', icon: <StoreMallDirectoryIcon />, path: '/onboard-business' },
];

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const drawer = (
    <div>
      <Toolbar sx={{ minHeight: 64 }}>
        <Typography variant="h6" fontWeight={700} color="#1976d2">
          InvoicePro
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              bgcolor: location.pathname === item.path ? '#e3f0fc' : 'inherit',
              '&:hover': { bgcolor: '#f0f7ff' },
            }}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon sx={{ color: '#1976d2' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1976d2' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight={700}>
            InvoicePro
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar navigation"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 1, md: 3 }, width: { md: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh', bgcolor: '#f6f8fa' }}
      >
        <Toolbar sx={{ minHeight: 64 }} />
        {children}
      </Box>
    </Box>
  );
}

function SectionHeader({ children }) {
  return (
    <Box mb={1} mt={3} display="flex" alignItems="center">
      <Box width={4} height={28} bgcolor="#1976d2" borderRadius={2} mr={1} />
      <Typography variant="h6" fontWeight={700} color="#1976d2">{children}</Typography>
    </Box>
  );
}

function Reports() {
  // Helper functions from previous Dashboard
  const getInvoicesOverTime = () => {
    const dateMap = {};
    invoices.forEach(inv => {
      dateMap[inv.date] = (dateMap[inv.date] || 0) + 1;
    });
    return Object.entries(dateMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  const getRevenueByShop = () => {
    const shopMap = {};
    invoices.forEach(inv => {
      shopMap[inv.shopId] = (shopMap[inv.shopId] || 0) + (inv.amount || 0);
    });
    return Object.entries(shopMap).map(([shopId, revenue]) => {
      const shop = shops.find(s => s.id === shopId);
      return {
        shop: shop ? shop.name : shopId,
        revenue,
      };
    });
  };
  const getPurchasesByCategory = () => {
    const catMap = {};
    invoices.forEach(inv => {
      catMap[inv.category] = (catMap[inv.category] || 0) + 1;
    });
    return Object.entries(catMap).map(([category, count]) => ({ category, count }));
  };
  const getWhatsAppDeliveriesPerDay = () => {
    const dateMap = {};
    invoices.forEach(inv => {
      if (inv.whatsappDelivery) {
        dateMap[inv.date] = (dateMap[inv.date] || 0) + 1;
      }
    });
    return Object.entries(dateMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  const recentInvoices = [...invoices].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight={700} color="#1976d2">
        Reports & Analytics
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <SectionHeader>Invoices Over Time</SectionHeader>
        <LineChart
          data={getInvoicesOverTime()}
          xKey="date"
          yKey="count"
          title=""
        />
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <SectionHeader>Revenue by Shop</SectionHeader>
        <BarChart
          data={getRevenueByShop()}
          xKey="shop"
          yKey="revenue"
          title=""
        />
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <SectionHeader>Category-Wise Purchases</SectionHeader>
        <PieChart
          data={getPurchasesByCategory()}
          dataKey="count"
          nameKey="category"
          title=""
        />
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <SectionHeader>WhatsApp Deliveries Per Day</SectionHeader>
        <BarChart
          data={getWhatsAppDeliveriesPerDay()}
          xKey="date"
          yKey="count"
          title=""
        />
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <SectionHeader>Recent Invoices</SectionHeader>
        <InvoiceTable rows={recentInvoices} />
      </Paper>
    </Box>
  );
}

function Settings() {
  return <Box p={3}><Typography variant="h4">Settings (Coming Soon)</Typography></Box>;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/onboard-business" element={<OnboardBusiness />} />
          <Route path="/customers/:customerNumber" element={<CustomerPage />} />
          <Route path="/shops/:shopId" element={<ShopPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
