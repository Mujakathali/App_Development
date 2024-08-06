import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Chip, Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Input } from '@mui/material';
import imagess from './shrek-close-up-face-desktop-wallpaper-4k.jpg';
const initialHalls = [
  { image:imagess, hall: '001', capacity: 'Fits up to 200 guests', price: '₹25000.00', availability: 'Not Available' },
  { image: 'image-url-2', hall: '002', capacity: 'Fits up to 700 guests', price: '₹35000.00', availability: 'Available' },
  { image: 'image-url-3', hall: '003', capacity: 'Fits up to 500 guests', price: '₹30000.00', availability: 'Not Available' },
  { image: 'image-url-4', hall: '004', capacity: 'Fits up to 1200 guests', price: '₹50000.00', availability: 'Not Available' },
  { image: 'image-url-5', hall: '005', capacity: 'Fits up to 700 guests', price: '₹35000.00', availability: 'Available' },
  { image: 'image-url-6', hall: '006', capacity: 'Fits up to 2500 guests', price: '₹80000.00', availability: 'Not Available' },
];

const HallsTable = () => {
  const [halls, setHalls] = useState(initialHalls);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [newHall, setNewHall] = useState({
    image: '',
    hall: '',
    capacity: '',
    price: '',
    availability: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHall((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewHall((prev) => ({
      ...prev,
      image: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleAddHall = () => {
    setHalls((prev) => [...prev, newHall]);
    setNewHall({
      image: '',
      hall: '',
      capacity: '',
      price: '',
      availability: '',
    });
    handleClose();
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const filteredHalls = halls.filter((hall) => {
    if (filter === 'No discount') {
      return hall.availability === 'Not Available';
    }
    if (filter === 'With discount') {
      return hall.availability === 'Available';
    }
    return true;
  });

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        All halls
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Button variant="outlined" onClick={() => handleFilterChange('All')} sx={{ mr: 1 }}>
            All halls
          </Button>
          <Button variant="outlined" onClick={() => handleFilterChange('No discount')} sx={{ mr: 1 }}>
            Not Available
          </Button>
          <Button variant="outlined" onClick={() => handleFilterChange('With discount')}>
            Available
          </Button>
        </Box>
        <Box>
          <Select defaultValue="Sort by name (A-Z)">
            <MenuItem value="Sort by name (A-Z)">Sort by name (A-Z)</MenuItem>
            <MenuItem value="Sort by name (Z-A)">Sort by name (Z-A)</MenuItem>
          </Select>
          <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleClickOpen}>
            + Add new hall
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hall Image</TableCell>
              <TableCell>Hall</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHalls.map((hall, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img src={hall.image} alt={hall.hall} style={{ width: '100px', height: 'auto' }} />
                </TableCell>
                <TableCell>{hall.hall}</TableCell>
                <TableCell>{hall.capacity}</TableCell>
                <TableCell>{hall.price}</TableCell>
                <TableCell>
                  <Chip
                    label={hall.availability}
                    style={{
                      backgroundColor: hall.availability === 'Available' ? '#d4edda' : '#f8d7da',
                      color: hall.availability==='Available'?'#155724':'#721c24'
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Hall</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the new hall.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="hall"
            label="Hall"
            type="text"
            fullWidth
            value={newHall.hall}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="capacity"
            label="Capacity"
            type="text"
            fullWidth
            value={newHall.capacity}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="text"
            fullWidth
            value={newHall.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="availability"
            label="Availability"
            type="text"
            fullWidth
            value={newHall.availability}
            onChange={handleChange}
          />
          <Input
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: 'image/*' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddHall} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HallsTable;
