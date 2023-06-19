import generatePassword from 'generate-password';

export const generateRandomPassword = (length: number) => {
  const passwordOptions = {
    length,
    numbers: true,
    symbols: true,
    exclude: '()-_=+[]{}|<,>.?/`~:;"',
    uppercase: true,
    lowercase: true,
    strict: true
  };

  return generatePassword.generate(passwordOptions);
};
