import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const drawerWidth = 220;

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  const adminNavItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Onboard Business', icon: <StoreMallDirectoryIcon />, path: '/onboard-business' },
    { text: 'Advertisement', icon: <CampaignIcon />, path: '/advertisement' },
  ];
  const businessNavItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/business/dashboard' },
    { text: 'Invoices', icon: <ReceiptLongIcon />, path: '/business/invoices' },
    { text: 'Customers', icon: <PeopleAltIcon />, path: '/business/customers' },
    { text: 'Credit Reminders', icon: <CreditCardIcon />, path: '/business/credits' },
    { text: 'Profile', icon: <SettingsIcon />, path: '/business/profile' },
  ];
  const navItems = role === 'admin' ? adminNavItems : role === 'business' ? businessNavItems : [];

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar onToggleSidebar={handleToggleSidebar} showSidebarToggle={!isLogin} />
      <Box sx={{ display: 'flex', flex: 1, pt: '64px' }}>
        <CssBaseline />
        {!isLogin && (
          <Sidebar open={sidebarOpen} onClose={handleToggleSidebar} navItems={navItems} selectedPath={location.pathname} />
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 1, md: 3 },
            width: !isLogin && sidebarOpen ? { md: `calc(100% - ${drawerWidth}px)` } : '100%',
            height: '100vh',
            pt: '64px', // height of TopBar
            bgcolor: '#f6f8fa',
            overflow: 'auto',
            transition: 'width 0.2s'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
} 