/* eslint-disable no-console */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Typography, Link } from '@mui/material';
import { StyledContainer, StyledForm } from './auth.styled';
import { loginValidate, registerValidate } from '../common/validation';

export const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleToogleAuth = () => setIsRegister(!isRegister);

  const handleFormSubmit = (
    values: {
      confirmPassword: string;
      email: string;
      password: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const loginValue = { email: values.email, password: values.password };
    if (isRegister) {
      console.log(values);
    } else {
      console.log(loginValue);
    }

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validateOnBlur: false,
    validate: isRegister ? registerValidate : loginValidate,
    onSubmit: handleFormSubmit
  });

  return (
    <StyledContainer sx={{ display: 'flex' }}>
      <Typography variant="h5">{isRegister ? 'Registration' : 'Login'}</Typography>
      <StyledForm onSubmit={formik.handleSubmit}>
        <TextField
          error={!!formik.errors.email}
          helperText={formik.errors.email}
          fullWidth
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          error={!!formik.errors.password}
          helperText={formik.errors.password}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {isRegister ? (
          <TextField
            error={!!formik.errors.confirmPassword}
            helperText={formik.errors.confirmPassword}
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
        ) : (
          <Typography variant="body2" align="right" marginTop="-20px">
            <Link sx={{ cursor: 'pointer' }}>Forgot password?</Link>
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={!formik.isValid}
        >
          {isRegister ? 'Registration' : 'Login'}
        </Button>
        <Typography variant="body2">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link sx={{ cursor: 'pointer' }} onClick={handleToogleAuth}>
            {isRegister ? 'Login' : 'Registration'}
          </Link>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};
