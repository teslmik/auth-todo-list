import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { useGlobalContext } from '../../hooks';
import { APP_KEYS } from '../../consts';
import { HeaderMenu } from '../header-menu';
import { ProfileModal } from '../profile-modal/profile-modal.component';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { setIsOpen } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpenProfile, setIsOpenProfile] = React.useState<{
    open: boolean;
    recovery?: boolean;
  }>({
    open: false,
    recovery: false
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleIsOpen = () => setIsOpen({ open: true, edit: false });

  return (
    <Container>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
        <Toolbar
          sx={{
            width: '100%',
            justifyContent: `
              ${pathname === APP_KEYS.ROUTER_KEYS.ROOT ? 'space-between' : 'flex-end'}
            `,
            padding: 0
          }}
        >
          {pathname === APP_KEYS.ROUTER_KEYS.ROOT && (
            <Button color="inherit" variant="outlined" onClick={handleIsOpen}>
              Add ToDo
            </Button>
          )}
          <Button color="inherit" variant="outlined" onClick={handleMenu}>
            My profile
          </Button>
          <HeaderMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} setIsOpen={setIsOpenProfile} />
        </Toolbar>
      </AppBar>
      <ProfileModal isOpen={isOpenProfile} setIsOpen={setIsOpenProfile} />
    </Container>
  );
};
