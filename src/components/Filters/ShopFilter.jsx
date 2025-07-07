import React, { useMemo } from 'react';
import { Box, Autocomplete, TextField, Stack, Paper, Button, InputAdornment } from '@mui/material';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';

const getUniqueLocations = (shops) => {
  const locations = shops.map(s => s.location);
  return Array.from(new Set(locations));
};

const getUniqueCategories = (shops, invoices) => {
  // Prefer shop categories, but also include from invoices if needed
  const shopCats = shops.map(s => s.category).filter(Boolean);
  const invoiceCats = (invoices || []).map(inv => inv.category).filter(Boolean);
  return Array.from(new Set([...shopCats, ...invoiceCats]));
};

const ShopFilter = ({ filters, onChange, shops = [], invoices = [] }) => {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  const categories = useMemo(() => getUniqueCategories(shops, invoices), [shops, invoices]);

  return (
    <Paper sx={{ p: 3, border: '2px solid #1976d2', borderRadius: 2, bgcolor: '#fafdff', mb: 2 }} elevation={0}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <Autocomplete
          options={shops.map(s => s.name)}
          value={filters.shopName || ''}
          onChange={(_, v) => handleChange('shopName', v)}
          renderInput={params => (
            <TextField
              {...params}
              label="Shop Name"
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <StoreMallDirectoryIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Autocomplete
          options={getUniqueLocations(shops)}
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

export default ShopFilter; 