import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Button, TextField, CircularProgress, Alert, Avatar, Stack, Divider, IconButton, Card, CardContent, Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getShops } from '../../utils/api';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CampaignIcon from '@mui/icons-material/Campaign';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Input = styled('input')({
  display: 'none',
});

const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 2px 16px 0 rgba(25, 118, 210, 0.08)',
  marginBottom: theme.spacing(3),
  background: '#fafdff',
}));

export default function Advertisement() {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getShops().then(res => setShops(res.data)).catch(() => setShops([]));
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!selectedShop || !image || !startDateTime || !endDateTime) {
      setError('Please fill all fields and upload an image.');
      return;
    }
    if (endDateTime <= startDateTime) {
      setError('End date & time must be after start date & time.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('Advertisement submitted successfully!');
      setSelectedShop('');
      setImage(null);
      setImagePreview(null);
      setStartDateTime(null);
      setEndDateTime(null);
    }, 1500);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f6f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, maxWidth: 1100, width: '100%', borderRadius: 5, boxShadow: 8 }}>
        <Box display="flex" alignItems="center" mb={3} gap={2}>
          <CampaignIcon sx={{ color: '#1976d2', fontSize: 48 }} />
          <Box>
            <Typography variant="h3" fontWeight={800} color="#1976d2" lineHeight={1.1}>
              Advertisement
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
              Promote your business to customers
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Left: Business & Image */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <SectionCard>
                  <CardContent>
                    <Typography variant="h6" color="#1976d2" fontWeight={700} mb={2}>
                      Select Business
                    </Typography>
                    <FormControl fullWidth size="large">
                      <InputLabel id="shop-label">Business</InputLabel>
                      <Select
                        labelId="shop-label"
                        value={selectedShop}
                        label="Business"
                        onChange={e => setSelectedShop(e.target.value)}
                        sx={{ fontSize: 20, minHeight: 60 }}
                      >
                        {shops.map(shop => (
                          <MenuItem key={shop.id} value={shop.id} sx={{ fontSize: 20, minHeight: 50 }}>{shop.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </CardContent>
                </SectionCard>
                <SectionCard>
                  <CardContent>
                    <Typography variant="h6" color="#1976d2" fontWeight={700} mb={2}>
                      Advertisement Image
                    </Typography>
                    <FormControl fullWidth>
                      <label htmlFor="ad-image-upload">
                        <Input
                          accept="image/*"
                          id="ad-image-upload"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Button
                          variant="outlined"
                          component="span"
                          fullWidth
                          startIcon={<CloudUploadIcon />}
                          sx={{ fontSize: 18, minHeight: 56, borderStyle: 'dashed', borderWidth: 2, borderColor: '#1976d2', bgcolor: '#f6f8fa', color: '#1976d2', mb: 2 }}
                        >
                          {image ? image.name : 'Upload Advertisement Image'}
                        </Button>
                      </label>
                      {imagePreview && (
                        <Box mt={2} display="flex" flexDirection="column" alignItems="center" gap={1}>
                          <Avatar
                            variant="rounded"
                            src={imagePreview}
                            alt="Ad Preview"
                            sx={{ width: 240, height: 240, border: '2px solid #1976d2', mb: 1, boxShadow: 3 }}
                          />
                          <IconButton color="error" onClick={handleRemoveImage} size="large">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </FormControl>
                  </CardContent>
                </SectionCard>
              </Stack>
            </Grid>
            {/* Right: Timing & Submit */}
            <Grid item xs={12} md={6} display="flex" flexDirection="column" justifyContent="space-between">
              <SectionCard sx={{ flex: 1, mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="#1976d2" fontWeight={700} mb={2}>
                    Advertisement Timing
                  </Typography>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DateTimePicker
                          label="Start Date & Time"
                          value={startDateTime}
                          onChange={setStartDateTime}
                          renderInput={(params) => <TextField {...params} sx={{ fontSize: 18, minWidth: 180 }} />}
                          minDateTime={new Date()}
                        />
                        <DateTimePicker
                          label="End Date & Time"
                          value={endDateTime}
                          onChange={setEndDateTime}
                          renderInput={(params) => <TextField {...params} sx={{ fontSize: 18, minWidth: 180 }} />}
                          minDateTime={startDateTime || new Date()}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </FormControl>
                </CardContent>
              </SectionCard>
              <Box mt={2}>
                {error && <Alert severity="error" sx={{ fontSize: 18, mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ fontSize: 18, mb: 2 }}>{success}</Alert>}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ fontWeight: 700, fontSize: 22, minHeight: 56, borderRadius: 3, boxShadow: 2 }}
                >
                  {loading ? <CircularProgress size={28} /> : 'Submit Advertisement'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
} 