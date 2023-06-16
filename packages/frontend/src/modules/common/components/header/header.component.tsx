import React from 'react';
import { useLocation } from 'react-router-dom';
import { Toolbar, Button, Container, Typography } from '@mui/material';
import { useGetUser, useGlobalContext } from '../../hooks';
import { APP_KEYS } from '../../consts';
import { HeaderMenu } from '../header-menu';
import { ProfileModal } from '../profile-modal/profile-modal.component';
import { StyledAppBar } from './header.styled';

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

  const { data: userData, isSuccess } = useGetUser(
    isOpenProfile.open ? !isOpenProfile.recovery : isOpenProfile.open
  );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleIsOpen = () => setIsOpen({ open: true, edit: false });

  return (
    <Container>
      <StyledAppBar position="static" color="transparent">
        <Toolbar
          className="toolbar"
          sx={{
            justifyContent: `
              ${pathname === APP_KEYS.ROUTER_KEYS.ROOT ? 'space-between' : 'flex-end'}
            `
          }}
        >
          {pathname === APP_KEYS.ROUTER_KEYS.ROOT && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleIsOpen}
              disabled={!userData?.isActivated}
            >
              Add
            </Button>
          )}
          <div className="profile-block">
            {isSuccess ? <Typography variant="body1">{userData.email}</Typography> : null}
            <Button color="inherit" variant="outlined" onClick={handleMenu} disabled={!isSuccess}>
              Profile
            </Button>
            <HeaderMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              setIsOpen={setIsOpenProfile}
            />
          </div>
        </Toolbar>
      </StyledAppBar>
      <ProfileModal
        isOpen={isOpenProfile}
        setIsOpen={setIsOpenProfile}
        userData={userData}
        isSuccess={isSuccess}
      />
    </Container>
  );
};
