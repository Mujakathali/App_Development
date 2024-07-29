// App.js
import React from 'react';
import { CssBaseline, Box, Grid, Paper, Typography, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ActivityTable from './components/ActivityTable';
import SummaryChart from './components/SummaryChart';
import SalesChart from './components/SalesChart';
import Footer from './components/Footer';
import UserPage from './components/UserPage';
import Report from './components/Report';

import HallsTable from './components/HallsTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f7f7f7',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: '8px',
        },
      },
    },
  },
});

const drawerWidth = 10;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <CssBaseline />
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
              <Routes>
                <Route path="/" element={
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper>
                        <Typography variant="h6">Bookings</Typography>
                        <Typography variant="h4">12</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper>
                        <Typography variant="h6">Sales</Typography>
                        <Typography variant="h4">₹39,335.00</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper>
                        <Typography variant="h6">Check Ins</Typography>
                        <Typography variant="h4">6</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper>
                        <Typography variant="h6">Occupancy Rate</Typography>
                        <Typography variant="h4">48%</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ActivityTable />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SummaryChart />
                    </Grid>
                    <Grid item xs={12}>
                      <SalesChart />
                    </Grid>
                  </Grid>
                } />
                <Route path="/users" element={<UserPage />} />
                <Route path="/report" element={<Report />} />
                <Route path="/halls" element={< HallsTable/>} />
              </Routes>
            </Box>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
