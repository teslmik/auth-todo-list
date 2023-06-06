import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import { appDataSource } from '../config/app-data-source';
import { Todo } from '../entities/entities';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
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
