import React from 'react';
import { Box, Autocomplete, TextField, Stack, Paper, Button, InputAdornment } from '@mui/material';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';

const getUniqueLocations = (shops) => {
  const locations = shops.map(s => s.location);
  return Array.from(new Set(locations));
};

const ShopFilter = ({ filters, onChange, shops = [] }) => {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

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
        <TextField
          label="Start Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={filters.startDate || ''}
          onChange={e => handleChange('startDate', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={filters.endDate || ''}
          onChange={e => handleChange('endDate', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" startIcon={<SearchIcon />} sx={{ height: 40, minWidth: 100 }}>
          Search
        </Button>
      </Stack>
    </Paper>
  );
};

export default ShopFilter; 