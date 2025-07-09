import React from 'react';
import { Drawer, Toolbar, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

export default function Sidebar({ open, onClose, navItems, selectedPath }) {
  if (!open) return null;
  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="sidebar navigation">
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <SidebarContent navItems={navItems} selectedPath={selectedPath} />
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
        <SidebarContent navItems={navItems} selectedPath={selectedPath} />
      </Drawer>
    </Box>
  );
}

function SidebarContent({ navItems, selectedPath }) {
  return (
    <>
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
            selected={selectedPath === item.path}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              bgcolor: selectedPath === item.path ? '#e3f0fc' : 'inherit',
              '&:hover': { bgcolor: '#f0f7ff' },
            }}
          >
            <ListItemIcon sx={{ color: '#1976d2' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
        ))}
      </List>
    </>
  );
} 