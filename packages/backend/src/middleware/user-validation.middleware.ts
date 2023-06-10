import joi from 'joi';
import { validateRequest } from '../utils';

const emailRegExp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const userValidation = {
  registerLogin: validateRequest(
    joi.object({
      email: joi.string().pattern(emailRegExp).required().messages({
        'string.pattern.base': 'Invalid email format',
        'string.empty': 'Email is required'
      }),
      password: joi.string().pattern(passwordRegExp).required().messages({
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one symbol',
        'string.empty': 'Password is required'
      })
    })
  ),

  update: validateRequest(
    joi.object({
      email: joi.string().pattern(emailRegExp).messages({
        'string.pattern.base': 'Invalid email format'
      }),
      password: joi.string().pattern(passwordRegExp).messages({
        'string.pattern':
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one symbol'
      }),
      newPassword: joi.string().valid(joi.ref('password')).messages({
        'any.only': 'Password mismatch'
      })
    })
  ),

  recovery: validateRequest(
    joi.object({
      email: joi.string().pattern(emailRegExp).required().messages({
        'string.pattern.base': 'Invalid email format',
        'string.empty': 'Email is required'
      })
    })
  )
};

export { userValidation };
