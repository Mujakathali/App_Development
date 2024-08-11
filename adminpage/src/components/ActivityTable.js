import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, Box, Typography, TableContainer } from '@mui/material';
import axios from 'axios';

const getStatusChip = (status) => {
  switch (status) {
    case 'Booked':
      return <Chip label="Booked" sx={{ backgroundColor: '#d4edda', color: '#155724' }} />;
    case 'Canceled':
      return <Chip label="Canceled" sx={{ backgroundColor: '#f8d7da', color: '#721c24' }} />;
    default:
      return null;
  }
};

const ActivityTable = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/bookings');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      }
    };

    fetchActivities();
  }, []);

  return (
    <TableContainer 
      component={Paper} 
      sx={{ mt: 3, maxHeight: '400px', overflowY: 'auto' }} // Set maxHeight and overflow
    >
      <Box p={2}>
        <Typography variant="h6">Status</Typography>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{getStatusChip(activity.status)}</TableCell>
                <TableCell>{activity.venue}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.time}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No activities found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityTable;
