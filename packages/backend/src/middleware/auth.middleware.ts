/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

const { JWT_SECRET } = process.env;

const userService = new UserService();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

const jwtAuthHandler = async (jwtPayload: any, done: any) => {
  try {
    const user = await userService.findUserById(jwtPayload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new JwtStrategy(jwtOptions, jwtAuthHandler));

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false })(req, res, next);
};

export const createToken = (userId: string) => {
  const payload = { userId };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  return `Bearer ${token}`;
};

export const validateToken = (token: string) => {
  try {
    const userData = jwt.verify(token, JWT_SECRET);

    return userData;
  } catch (error) {
    return String(error);
  }
};
