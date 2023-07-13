import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { IUser } from '../types';
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
  passport.authenticate('jwt', { session: false }, (error: unknown, user: IUser) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    return next();

  })(req, res, next);
};
