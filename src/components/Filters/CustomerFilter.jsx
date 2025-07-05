import React from 'react';
import { Box, Autocomplete, TextField, Stack, Paper, Button, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';

const getUniqueLocations = (customers) => {
  const locations = customers.flatMap(c => c.locationsVisited);
  return Array.from(new Set(locations));
};

const CustomerFilter = ({ filters, onChange, customers = [] }) => {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <Paper sx={{ p: 3, border: '2px solid #1976d2', borderRadius: 2, bgcolor: '#fafdff', mb: 2 }} elevation={0}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <Autocomplete
          options={customers.map(c => c.phoneNumber)}
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

export default CustomerFilter; 