import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, Alert, Divider, CircularProgress, MenuItem, InputAdornment, Fade } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PinIcon from '@mui/icons-material/Pin';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { createShop, getApiError } from '../utils/api';

const GST_TYPES = [
  { value: 'Regular', label: 'Regular' },
  { value: 'Composition', label: 'Composition' },
  { value: 'Unregistered', label: 'Unregistered' },
  { value: 'Consumer', label: 'Consumer' },
  { value: 'Other', label: 'Other' },
];

const OnboardBusiness = () => {
  const [form, setForm] = useState({
    name: '',
    city: '',
    state: '',
    category: '',
    contactName: '',
    contactPhone1: '',
    contactPhone2: '',
    contactEmail: '',
    address: '',
    pinCode: '',
    phone1: '',
    gstNumber: '',
    gstType: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Shop Name is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    if (!form.category.trim()) errs.category = 'Category is required';
    if (!form.contactName.trim()) errs.contactName = 'Contact Name is required';
    if (!form.contactPhone1.trim()) errs.contactPhone1 = 'At least one contact phone is required';
    else if (!/^\d{10}$/.test(form.contactPhone1)) errs.contactPhone1 = 'Enter a valid 10-digit number';
    if (form.contactPhone2 && !/^\d{10}$/.test(form.contactPhone2)) errs.contactPhone2 = 'Enter a valid 10-digit number';
    if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail)) errs.contactEmail = 'Enter a valid email';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.pinCode.trim()) errs.pinCode = 'Pin Code is required';
    else if (!/^\d{6}$/.test(form.pinCode)) errs.pinCode = 'Enter a valid 6-digit pin code';
    if (form.phone1 && !/^\d{10}$/.test(form.phone1)) errs.phone1 = 'Enter a valid 10-digit number';
    if (!form.gstNumber.trim()) errs.gstNumber = 'GST Number is required';
    if (!form.gstType.trim()) errs.gstType = 'GST Type is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    let errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
        const payload = {
          name: form.name,
          city: form.city,
          state: form.state,
          category: form.category,
          contactName: form.contactName,
          contactPhone: [form.contactPhone1.trim(), form.contactPhone2.trim()].filter(Boolean),
          contactEmail: form.contactEmail,
          address: form.address,
          pinCode: form.pinCode,
          phone1: form.phone1,
          gstNumber: form.gstNumber,
          gstType: form.gstType,
        };
        const res = await createShop(payload);
        if (res.data.success) {
          setSuccess(true);
          setForm({
            name: '', city: '', state: '', category: '', contactName: '', contactPhone1: '', contactPhone2: '', contactEmail: '', address: '', pinCode: '', phone1: '', gstNumber: '', gstType: ''
          });
          setErrors({});
          setTimeout(() => setSuccess(false), 3000);
        } else if (res.data.errors) {
          setErrors(res.data.errors);
          setApiError('');
        } else {
          setApiError(res.data.message || 'Failed to create shop');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
          setApiError('');
        } else {
          setApiError(getApiError(error));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f6f8fa', minHeight: '100vh' }}>
      <Fade in={success} timeout={600} unmountOnExit>
        <Box sx={{ position: 'fixed', top: 90, left: 0, right: 0, zIndex: 1200, display: 'flex', justifyContent: 'center' }}>
          <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="success" sx={{ fontSize: 20, px: 4, py: 2, borderRadius: 3, boxShadow: 3, bgcolor: '#e6f9ed' }}>
            Shop created successfully!
          </Alert>
        </Box>
      </Fade>
      <Paper sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', borderRadius: 4, boxShadow: 6, background: 'linear-gradient(135deg, #f8fafc 60%, #e3f0ff 100%)' }}>
        <Typography variant="h4" fontWeight={700} color="#1976d2" gutterBottom align="center" sx={{ letterSpacing: 1 }}>
          <BusinessIcon sx={{ mr: 1, fontSize: 36, verticalAlign: 'middle' }} /> Onboard New Shop
        </Typography>
        {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={3} alignItems="stretch">
            {/* Basic Details Card */}
            <Grid item xs={12} md={4}>
              <Box sx={{ height: '100%', p: 3, borderRadius: 3, boxShadow: 2, bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Typography variant="h6" fontWeight={600} color="#1976d2" sx={{ mb: 2, letterSpacing: 0.5 }}>
                  <BusinessIcon sx={{ mr: 1, fontSize: 22, verticalAlign: 'middle' }} /> Basic Details
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <TextField label="Shop Name" name="name" value={form.name} onChange={handleChange} required fullWidth size="small" error={!!errors.name} helperText={errors.name} InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="City" name="city" value={form.city} onChange={handleChange} required fullWidth size="small" error={!!errors.city} helperText={errors.city} InputProps={{ startAdornment: <InputAdornment position="start"><LocationCityIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="State" name="state" value={form.state} onChange={handleChange} required fullWidth size="small" error={!!errors.state} helperText={errors.state} InputProps={{ startAdornment: <InputAdornment position="start"><PublicIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Category" name="category" value={form.category} onChange={handleChange} required fullWidth size="small" error={!!errors.category} helperText={errors.category} InputProps={{ startAdornment: <InputAdornment position="start"><CategoryIcon color="action" /></InputAdornment> }} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            {/* Contact Details Card */}
            <Grid item xs={12} md={4}>
              <Box sx={{ height: '100%', p: 3, borderRadius: 3, boxShadow: 2, bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Typography variant="h6" fontWeight={600} color="#1976d2" sx={{ mb: 2, letterSpacing: 0.5 }}>
                  <PersonIcon sx={{ mr: 1, fontSize: 22, verticalAlign: 'middle' }} /> Contact Details
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <TextField label="Contact Name" name="contactName" value={form.contactName} onChange={handleChange} required fullWidth size="small" error={!!errors.contactName} helperText={errors.contactName} InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Contact Phone 1" name="contactPhone1" value={form.contactPhone1} onChange={handleChange} required fullWidth size="small" inputProps={{ maxLength: 10 }} error={!!errors.contactPhone1} helperText={errors.contactPhone1 || 'Required'} InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Contact Phone 2 (optional)" name="contactPhone2" value={form.contactPhone2} onChange={handleChange} fullWidth size="small" inputProps={{ maxLength: 10 }} error={!!errors.contactPhone2} helperText={errors.contactPhone2} InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Contact Email" name="contactEmail" value={form.contactEmail} onChange={handleChange} type="email" fullWidth size="small" error={!!errors.contactEmail} helperText={errors.contactEmail} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon color="action" /></InputAdornment> }} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            {/* Shop Details Card */}
            <Grid item xs={12} md={4}>
              <Box sx={{ height: '100%', p: 3, borderRadius: 3, boxShadow: 2, bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Typography variant="h6" fontWeight={600} color="#1976d2" sx={{ mb: 2, letterSpacing: 0.5 }}>
                  <HomeIcon sx={{ mr: 1, fontSize: 22, verticalAlign: 'middle' }} /> Shop Details
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <TextField label="Address" name="address" value={form.address} onChange={handleChange} required fullWidth multiline minRows={2} maxRows={4} size="small" error={!!errors.address} helperText={errors.address} InputProps={{ startAdornment: <InputAdornment position="start"><HomeIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Pin Code" name="pinCode" value={form.pinCode} onChange={handleChange} required fullWidth size="small" inputProps={{ maxLength: 6 }} error={!!errors.pinCode} helperText={errors.pinCode} InputProps={{ startAdornment: <InputAdornment position="start"><PinIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Phone Number (optional)" name="phone1" value={form.phone1} onChange={handleChange} fullWidth size="small" inputProps={{ maxLength: 10 }} error={!!errors.phone1} helperText={errors.phone1} InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="GST Number" name="gstNumber" value={form.gstNumber} onChange={handleChange} required fullWidth size="small" error={!!errors.gstNumber} helperText={errors.gstNumber} InputProps={{ startAdornment: <InputAdornment position="start"><AssignmentIndIcon color="action" /></InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField 
                      select 
                      label="GST Type" 
                      name="gstType" 
                      value={form.gstType} 
                      onChange={handleChange} 
                      required 
                      fullWidth 
                      size="small" 
                      error={!!errors.gstType} 
                      helperText={errors.gstType} 
                      InputLabelProps={{ shrink: true }}
                      sx={{ minWidth: 180 }}
                    >
                      {GST_TYPES.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 4, mb: 2 }} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={loading} sx={{
                borderRadius: 3,
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 1,
                py: 1.5,
                background: 'linear-gradient(90deg, #1976d2 60%, #21cbf3 100%)',
                boxShadow: 4,
                transition: 'all 0.2s',
                '&:hover': { background: 'linear-gradient(90deg, #1565c0 60%, #00bcd4 100%)', boxShadow: 8 }
              }} startIcon={loading && <CircularProgress size={20} color="inherit" />}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default OnboardBusiness; 