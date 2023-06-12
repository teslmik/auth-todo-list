import { Menu, MenuItem } from '@mui/material';
import React from 'react';

interface Props {
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      recovery?: boolean;
    }>
  >;
}

export const HeaderMenu: React.FC<Props> = ({ anchorEl, setAnchorEl, setIsOpen }) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    setAnchorEl(null);
    setIsOpen({ open: true, recovery: false });
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('token');
  };

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleEditProfile}>Edit profile</MenuItem>
      <MenuItem onClick={handleLogout}>LogOut</MenuItem>
    </Menu>
  );
};
