import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../enums/status-code.enum';

const tryCatchMiddleware =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message ? error.message : String(error) });
      next(error);
    }
  };

export { tryCatchMiddleware };
