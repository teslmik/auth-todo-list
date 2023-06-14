import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../enums';
import { appDataSource } from '../config/app-data-source';
import { Todo } from '../entities';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todoRepository = appDataSource.getRepository(Todo);

    const todo = await todoRepository.findOneBy({ id });
    if (!todo) {
      return res.status(StatusCode.NOT_FOUND).json({ message: 'Todo not found' });
    }

    next();
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export { isExists };
