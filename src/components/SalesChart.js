import React, { useState } from 'react';
import { Paper, Box, Typography, Grid, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const initialData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Booking Range',
      data: [0, 3000, 4000, 9000, 3000, 6000, 2000],
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const SalesChart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState(initialData);

  const updateData = () => {

    setData({
      ...initialData,
    
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'], 
      datasets: [
        {
          ...initialData.datasets[0],
          data: [0, 2000, 5000, 8000, 2000, 5000, 10000] 
        }
      ]
    });
  };

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6">Booking Statistics</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Start Date</Typography>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy/MM/dd" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">End Date</Typography>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="yyyy/MM/dd" />
          </Grid>
          <Grid item xs={12} md={6} display="flex" alignItems="flex-end">
            <Button variant="contained" color="primary" onClick={updateData}>
              Update Chart
            </Button>
          </Grid>
        </Grid>
        <Line data={data} />
      </Box>
    </Paper>
  );
};

export default SalesChart;
