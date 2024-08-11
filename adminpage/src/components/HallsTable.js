import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Chip, Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const HallsTable = () => {
  const [halls, setHalls] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // State for confirmation dialog
  const [editMode, setEditMode] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);
  const [filter, setFilter] = useState('All');
  const [newHall, setNewHall] = useState({
    hall: '',
    capacity: '',
    price: '',
    availability: 'Available', // Default value
    image: ''
  });

  // Fetch halls from backend
  const fetchHalls = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/halls');
      setHalls(response.data);
    } catch (error) {
      console.error('Error fetching halls:', error);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  const handleClickOpen = (hall = null) => {
    if (hall) {
      setSelectedHall(hall);
      setNewHall(hall);
      setEditMode(true);
    } else {
      setSelectedHall(null);
      setNewHall({
        hall: '',
        capacity: '',
        price: '',
        availability: 'Available',
        image: ''
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmOpen(false); // Close confirmation dialog if open
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHall((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!newHall.hall || !newHall.capacity || !newHall.price || !newHall.availability) {
      console.error('All fields must be filled');
      return;
    }

    try {
      if (editMode) {
        // Update existing hall
        await axios.put(`http://localhost:8080/api/v1/halls/${selectedHall.id}`, newHall);
      } else {
        // Add new hall
        await axios.post('http://localhost:8080/api/v1/halls', newHall);
      }

      fetchHalls(); // Refresh the list after saving
      handleClose();
    } catch (error) {
      console.error('Error saving hall:', error);
    }
  };

  const handleDeleteClick = (hall) => {
    setSelectedHall(hall);
    setConfirmOpen(true); // Open confirmation dialog
  };

  const handleDelete = async () => {
    try {
      if (selectedHall) {
        await axios.delete(`http://localhost:8080/api/v1/halls/${selectedHall.id}`);
        fetchHalls(); // Refresh the list after deletion
        handleClose();
      }
    } catch (error) {
      console.error('Error deleting hall:', error);
    }
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
          <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => handleClickOpen()}>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHalls.map((hall) => (
              <TableRow key={hall.id}>
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
                      color: hall.availability === 'Available' ? '#155724' : '#721c24',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(hall)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(hall)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Hall' : 'Add New Hall'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode ? 'Update the details of the hall.' : 'Please fill in the details of the new hall.'}
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
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            value={newHall.image}
            onChange={handleChange}
          />
          <Select
            margin="dense"
            name="availability"
            label="Availability"
            value={newHall.availability}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Not Available">Not Available</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">{editMode ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this hall?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HallsTable;
