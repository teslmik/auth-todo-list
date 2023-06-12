import { Box, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useGetUser, useEditUser, useRecoveryPassword } from '../../hooks';
import { IUpdateUser } from '../../types';
import { profileValidate } from '../../validation';
import { profileModalStyled } from './profile-modal.styled';

interface Props {
  isOpen: { open: boolean; recovery?: boolean };
  setIsOpen: React.Dispatch<React.SetStateAction<{ open: boolean; recovery?: boolean }>>;
}

export const ProfileModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { data: userData, isSuccess } = useGetUser();
  const { mutate: editUser } = useEditUser();
  const { mutate: recovery } = useRecoveryPassword();

  const handleOnSudmit = (data: IUpdateUser) => {
    if (isOpen.recovery) {
      recovery(data.email);
    } else if (!data.password && !data.newPassword) {
      editUser({ email: data.email });
    } else editUser(data);

    setIsOpen({ open: false });
  };

  const { values, handleChange, handleSubmit, setFieldValue, errors, isValid, touched, resetForm } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        newPassword: ''
      },
      validate: profileValidate,
      onSubmit: handleOnSudmit
    });

  const handleOnClose = () => {
    setIsOpen((prev) => ({ open: false, recovery: prev.recovery }));
    resetForm();
  };

  React.useEffect(() => {
    if (isSuccess) {
      if (isOpen.recovery) {
        setFieldValue('email', '');
      } else {
        setFieldValue('email', userData?.email);
        setFieldValue('password', '');
      }
    }
  }, [isOpen, isSuccess]);

  return (
    <Modal
      open={isOpen.open}
      onClose={handleOnClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ p: 4 }}
    >
      <Fade in={isOpen.open}>
        <Box sx={profileModalStyled} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isOpen.recovery ? 'Recovery password' : 'Edit Profile'}
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
            <TextField
              error={!!errors.email && !touched.email}
              helperText={errors.email}
              fullWidth
              id="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
            {!isOpen.recovery && (
              <>
                <TextField
                  error={!!errors.password && !touched.password}
                  helperText={errors.password}
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
                <TextField
                  error={!!errors.newPassword && !touched.newPassword}
                  helperText={errors.newPassword}
                  fullWidth
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  type="password"
                  placeholder="Your new password"
                  value={values.newPassword}
                  onChange={handleChange}
                />
              </>
            )}
            <Button variant="contained" type="submit" disabled={!isValid}>
              {isOpen.recovery ? 'Recovery password' : 'Edit Profile'}
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
