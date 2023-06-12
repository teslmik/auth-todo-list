import jwt, { JwtPayload } from 'jsonwebtoken';

class TokenService {
  createToken(payload: JwtPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });
    return `Bearer ${token}`;
  }

  validateToken(token: string) {
    try {
      const userData = jwt.verify(token.split(' ')[0], process.env.JWT_SECRET) as { id: string };

      return userData;
    } catch (error) {
      return String(error);
    }
  }
}

export const tokenService = new TokenService();
