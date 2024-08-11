import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: '', firstName: '', lastName: '', phone: '', role: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  // Handle open dialog
  const handleClickOpen = (user = null) => {
    if (user) {
      setEditMode(true);
      setCurrentUser(user);
    } else {
      setEditMode(false);
      setCurrentUser({ email: '', firstName: '', lastName: '', phone: '', role: '' });
    }
    setOpen(true);
  };

  // Handle close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (editMode) {
      // Update user
      try {
        await axios.put(`http://localhost:8080/api/v1/users/${currentUser.id}`, currentUser);
        fetchUsers();
        handleClose();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      // Add new user
      try {
        await axios.post('http://localhost:8080/api/v1/users', currentUser);
        fetchUsers();
        handleClose();
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  // Handle open confirmation dialog
  const handleClickConfirmOpen = (user) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };

  // Handle close confirmation dialog
  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setUserToDelete(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/users/${userToDelete.id}`);
        fetchUsers();
        handleConfirmClose();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleClickOpen()}>
        Add User
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleClickOpen(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleClickConfirmOpen(user)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={currentUser.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="First Name"
            name="firstName"
            value={currentUser.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastName"
            value={currentUser.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={currentUser.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Role"
            name="role"
            value={currentUser.role}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
