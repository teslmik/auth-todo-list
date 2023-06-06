import { Request, Response, NextFunction } from 'express';

const tryCatchMiddleware =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export { tryCatchMiddleware };
