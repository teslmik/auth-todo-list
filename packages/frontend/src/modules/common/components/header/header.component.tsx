import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { useGlobalContext } from '../../hooks';
import { APP_KEYS } from '../../consts';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { setIsOpen } = useGlobalContext();

  return (
    <Container>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
        <Toolbar
          sx={{
            width: '100%',
            justifyContent: `${
              pathname === APP_KEYS.ROUTER_KEYS.ROOT ? 'space-between' : 'flex-end'
            }`,
            padding: 0
          }}
        >
          {pathname === APP_KEYS.ROUTER_KEYS.ROOT && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => setIsOpen({ open: true, edit: false })}
            >
              Add ToDo
            </Button>
          )}
          <Button color="inherit" variant="outlined">
            My profile
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
