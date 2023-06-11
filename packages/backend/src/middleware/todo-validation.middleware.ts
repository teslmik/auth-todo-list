import joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import { StatusCode } from '../enums/enums';
import { Todo } from '../entities';

const todoValidation = {
  create: (req: Request, res: Response, next: NextFunction) => {
    const schema: joi.ObjectSchema<Todo> = joi.object({
      title: joi.string().required().messages({
        'string.empty': 'Title is required'
      }),
      description: joi.string().required().messages({
        'string.empty': 'Description is required'
      }),
      private: joi.boolean().required()
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
      title: joi.string().trim().required().messages({
        'string.empty': 'Title is required'
      }),
      description: joi.string().trim().required().messages({
        'string.empty': 'Description is required'
      }),
      completed: joi.boolean().required(),
      private: joi.boolean().required()
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
