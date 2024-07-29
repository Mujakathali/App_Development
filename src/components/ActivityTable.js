import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, Box, Typography, TableContainer } from '@mui/material';

const activities = [
  { name: 'John Doe', status: 'Booked', venue: 'Avana 3', date: '13 March 2023', time: '09:00-12:00' },
  { name: 'Jane Smith', status: 'Booked', venue: 'Avana 2', date: '14 March 2023', time: '12:00-15:00' },
  { name: 'Mike Johnson', status: 'Canceled', venue: 'Avana 1', date: '15 March 2023', time: '15:00-18:00' },
  { name: 'Emily Davis', status: 'Booked', venue: 'Avana 4', date: '16 March 2023', time: '18:00-21:00' },
  { name: 'David Wilson', status: 'Canceled', venue: 'Avana 5', date: '17 March 2023', time: '21:00-00:00' },
];

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
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Box p={2}>
        <Typography variant="h6">Status</Typography>
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
          {activities.map((activity, index) => (
            <TableRow key={index}>
              <TableCell>{activity.name}</TableCell>
              <TableCell>{getStatusChip(activity.status)}</TableCell>
              <TableCell>{activity.venue}</TableCell>
              <TableCell>{activity.date}</TableCell>
              <TableCell>{activity.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityTable;
