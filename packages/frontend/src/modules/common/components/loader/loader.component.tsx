import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loader: React.FC = () => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    <CircularProgress />
  </Box>
);
