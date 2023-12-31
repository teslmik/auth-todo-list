import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { TextField, Button, Typography, Link } from '@mui/material';
import { StyledContainer, StyledForm, StyledTitle } from './auth.styled';
import { loginValidate, registerValidate } from '../common/validation';
import { ProfileModal } from '../common/components/profile-modal';
import { useLoginUser, useRegisterUser } from '../common/hooks';
import { Loader } from '../common/components/loader';
import { APP_KEYS } from '../common/consts';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: login, isLoading: loginLoading, isSuccess: loginSuccess } = useLoginUser();
  const {
    mutate: registration,
    isLoading: registerLoading,
    isSuccess: registerSuccess
  } = useRegisterUser();

  const [isRegister, setIsRegister] = React.useState(false);
  const [modalIsOpen, setModalIsOpen] = React.useState<{
    open: boolean;
    recovery?: boolean;
  }>({ open: false, recovery: false });

  const handleToogleAuth = () => setIsRegister(!isRegister);
  const handleRecovery = () => {
    setModalIsOpen({ open: true, recovery: true });
  };

  const handleFormSubmit = (
    values: {
      confirmPassword: string;
      email: string;
      password: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const formValues = { email: values.email, password: values.password };
    if (isRegister) {
      registration(formValues);
    } else {
      login(formValues);
    }

    setSubmitting(false);
  };

  const { values, handleChange, errors, handleSubmit, isValid, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validateOnBlur: false,
    validate: isRegister ? registerValidate : loginValidate,
    onSubmit: handleFormSubmit
  });

  React.useEffect(() => {
    if (loginSuccess || registerSuccess) {
      navigate(APP_KEYS.ROUTER_KEYS.ROOT);
    }
  }, [loginSuccess, registerSuccess, navigate]);

  if (loginLoading || registerLoading || loginSuccess || registerSuccess) {
    return <Loader />;
  }

  return (
    <StyledContainer>
      <StyledTitle variant="h2">Todo List</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Typography align="center" variant="h5">
          {isRegister ? 'Registration' : 'Login'}
        </Typography>
        <TextField
          error={!!errors.email && !touched.email}
          helperText={!touched.email && errors.email}
          fullWidth
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
        />
        <TextField
          error={!!errors.password && !touched.password}
          helperText={!touched.password && errors.password}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
        />
        {isRegister ? (
          <TextField
            error={!!errors.confirmPassword && !touched.confirmPassword}
            helperText={!touched.confirmPassword && errors.confirmPassword}
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
        ) : (
          <Typography variant="body2" align="right" marginTop="-20px">
            <Link onClick={handleRecovery}>Forgot password?</Link>
          </Typography>
        )}
        <Button fullWidth variant="contained" color="primary" type="submit" disabled={!isValid}>
          {isRegister ? 'Registration' : 'Login'}
        </Button>
        <Typography variant="body2">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link onClick={handleToogleAuth}>{isRegister ? 'Login' : 'Registration'}</Link>
        </Typography>
      </StyledForm>
      <ProfileModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </StyledContainer>
  );
};
