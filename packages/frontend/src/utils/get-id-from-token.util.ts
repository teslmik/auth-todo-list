// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
}

export const getUserIdFromToken = (token: string): string => {
  const decodedToken: DecodedToken = jwt.verify(
    token.slice(7),
    process.env.REACT_APP_JWT_SECRET as string
  ) as DecodedToken;
  return decodedToken.id;
};
