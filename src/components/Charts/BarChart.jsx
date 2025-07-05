import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const BarChart = ({ data, xKey, yKey, title }) => (
  <Paper sx={{ p: 2, height: 1 }} elevation={1}>
    {title && <Typography variant="subtitle1" mb={2}>{title}</Typography>}
    <ResponsiveContainer width="100%" height={220}>
      <ReBarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} fill="#1976d2" />
      </ReBarChart>
    </ResponsiveContainer>
  </Paper>
);

export default BarChart; 