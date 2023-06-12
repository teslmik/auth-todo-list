// eslint-disable-next-line import/no-extraneous-dependencies
import generatePassword from 'generate-password';

export const generateRandomPassword = (length: number) => {
  const passwordOptions = {
    length,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    strict: true
  };

  return generatePassword.generate(passwordOptions);
};
