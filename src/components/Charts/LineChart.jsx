import React from 'react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const LineChart = ({ data, xKey, yKey, title }) => (
  <Paper sx={{ p: 2, height: 1 }} elevation={1}>
    {title && <Typography variant="subtitle1" mb={2}>{title}</Typography>}
    <ResponsiveContainer width="100%" height={220}>
      <ReLineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={yKey} stroke="#1976d2" strokeWidth={2} dot={false} />
      </ReLineChart>
    </ResponsiveContainer>
  </Paper>
);

export default LineChart; 