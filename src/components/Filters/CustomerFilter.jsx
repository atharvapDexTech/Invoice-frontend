import React, { useMemo } from 'react';
import { Box, Autocomplete, TextField, Stack, Paper, Button, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';

const getUniqueLocations = (customers) => {
  const locations = customers.flatMap(c => c.locationsVisited);
  return Array.from(new Set(locations));
};

const getUniqueCategories = (invoices) => {
  return Array.from(new Set((invoices || []).map(inv => inv.category)));
};

const CustomerFilter = ({ filters, onChange, customers = [], invoices = [] }) => {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  // Filter customers by location if location is selected
  const filteredCustomers = useMemo(() => {
    if (!filters.location) return customers;
    return customers.filter(c => (c.locationsVisited || []).includes(filters.location));
  }, [customers, filters.location]);

  const categories = useMemo(() => getUniqueCategories(invoices), [invoices]);

  return (
    <Paper sx={{ p: 3, border: '2px solid #1976d2', borderRadius: 2, bgcolor: '#fafdff', mb: 2 }} elevation={0}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <Autocomplete
          options={getUniqueLocations(customers)}
          value={filters.location || ''}
          onChange={(_, v) => handleChange('location', v)}
          renderInput={params => (
            <TextField
              {...params}
              label="Location"
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Autocomplete
          options={filteredCustomers.map(c => c.phoneNumber)}
          value={filters.customerNumber || ''}
          onChange={(_, v) => handleChange('customerNumber', v)}
          renderInput={params => (
            <TextField
              {...params}
              label="Customer Number"
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Autocomplete
          options={categories}
          value={filters.category || ''}
          onChange={(_, v) => handleChange('category', v)}
          renderInput={params => (
            <TextField
              {...params}
              label="Category"
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <TextField
          label="Purchase Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={filters.purchaseDate || ''}
          onChange={e => handleChange('purchaseDate', e.target.value)}
          sx={{ minWidth: 150 }}
        />
        <Button variant="contained" color="primary" startIcon={<SearchIcon />} sx={{ height: 40, minWidth: 100 }}>
          Search
        </Button>
        <Button variant="outlined" color="primary" onClick={() => onChange({})} sx={{ height: 40, minWidth: 100 }}>
          Clear Filters
        </Button>
      </Stack>
    </Paper>
  );
};

export default CustomerFilter; 