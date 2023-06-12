import joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import { StatusCode } from '../enums';

export const validateRequest =
  (schema: joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(StatusCode.BAD_REQUEST).json({ error: error.details[0].message });
      return;
    }

    next();
  };
