import joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import { StatusCode } from '../enums/enums';
import { Todo } from '../entities/entities';

const todoValidation = {
  create: (req: Request, res: Response, next: NextFunction) => {
    const schema: joi.ObjectSchema<Todo> = joi.object({
      title: joi.string().min(1).required(),
      description: joi.string().min(1).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res.status(StatusCode.BAD_REQUEST).json({ error: error.details[0].message });
      return;
    }

    next();
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    const schema: joi.ObjectSchema<Todo> = joi.object({
      title: joi.string().min(1).trim().required(),
      description: joi.string().min(1).trim().required(),
      complited: joi.boolean().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res.status(StatusCode.BAD_REQUEST).json({ error: error.details[0].message });
      return;
    }

    next();
  }
};

export { todoValidation };
