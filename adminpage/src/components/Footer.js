import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0'
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2024 Hall Booking System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
