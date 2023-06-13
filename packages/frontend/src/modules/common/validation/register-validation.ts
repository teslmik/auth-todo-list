type RegisterErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export const registerValidate = (values: {
  confirmPassword: string;
  email: string;
  password: string;
}) => {
  const errors: RegisterErrors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (
    !/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i.test(
      values.email
    )
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/.test(values.password)
  ) {
    errors.password =
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one symbol';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password mismatch';
  }

  return errors;
};
