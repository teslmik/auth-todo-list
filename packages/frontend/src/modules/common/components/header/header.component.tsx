import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

export const Header: React.FC = () => (
  <Container>
    <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: 0 }}>
        <Button color="inherit" variant="outlined">
          Add ToDo
        </Button>
        <Button color="inherit" variant="outlined">
          My profile
        </Button>
      </Toolbar>
    </AppBar>
  </Container>
);
