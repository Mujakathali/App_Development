import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { Home, People,BarChart,InsertChart, Description,MeetingRoom  } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import Assessment from '@mui/icons-material/Assessment';

const drawerWidth = 200;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#fdfdfd',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
        <Typography variant="h6">Hall Booking</Typography>
      </Box>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Assessment /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/halls">
          <ListItemIcon><MeetingRoom /></ListItemIcon>
          <ListItemText primary="Halls" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/report">
          <ListItemIcon> <Description/></ListItemIcon> {/* Corrected: Only one icon */}
          <ListItemText primary="Report" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
