import React from 'react';
import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Paper, Typography } from '@mui/material';

const COLORS = ['#1976d2', '#26a69a', '#ffa726', '#ef5350', '#ab47bc', '#8d6e63', '#789262', '#d4e157'];

const PieChart = ({ data, dataKey, nameKey, title }) => (
  <Paper sx={{ p: 2, height: 1 }} elevation={1}>
    {title && <Typography variant="subtitle1" mb={2}>{title}</Typography>}
    <ResponsiveContainer width="100%" height={220}>
      <RePieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#1976d2"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </ResponsiveContainer>
  </Paper>
);

export default PieChart; 