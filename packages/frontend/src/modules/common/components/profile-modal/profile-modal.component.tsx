import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useEditUser, useRecoveryPassword } from '../../hooks';
import { IUpdateUser, IUser } from '../../types';
import { profileValidate } from '../../validation';
import { profileModalStyled } from './profile-modal.styled';

interface Props {
  isOpen: { open: boolean; recovery?: boolean };
  setIsOpen: React.Dispatch<React.SetStateAction<{ open: boolean; recovery?: boolean }>>;
  userData?: IUser | undefined;
  isSuccess?: boolean;
}

export const ProfileModal: React.FC<Props> = ({ isOpen, setIsOpen, userData, isSuccess }) => {
  const { mutate: editUser, isLoading: editIsLoading } = useEditUser();
  const { mutate: recovery, isLoading: recoveryIsLoading } = useRecoveryPassword();

  const handleOnSudmit = (data: IUpdateUser) => {
    if (isOpen.recovery) {
      recovery(data?.email as string);
    } else if (!data.password && !data.newPassword) {
      if (data.email && data.email !== userData?.email) {
        editUser({ email: data.email });
      }
    } else if (!data.email || data.email === userData?.email) {
      editUser({
        password: data?.password,
        newPassword: data?.newPassword
      });
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

  if (editIsLoading || recoveryIsLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

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
            <Button
              variant="contained"
              type="submit"
              disabled={!isValid || (!values.email && !values.newPassword && !values.password)}
            >
              {isOpen.recovery ? 'Recovery password' : 'Edit Profile'}
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
