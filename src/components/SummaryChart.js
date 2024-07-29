import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Birthday', 'Naming Ceremony', 'Executive Ceremony', 'Marriage '],
  datasets: [
    {
      data: [10, 20, 30, 40],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
    },
  ],
};

const SummaryChart = () => {
  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6">Event Types
          
        </Typography>
        <Pie data={data} />
      </Box>
    </Paper>
  );
};

export default SummaryChart;
