import { Router } from 'express';

import { isExists, todoValidation, tryCatchMiddleware } from '../../middleware/middlewares';
import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('', tryCatchMiddleware(todoController.getAllTodo.bind(todoController)));
todosRouter.post(
  '',
  todoValidation.create,
  tryCatchMiddleware(todoController.create.bind(todoController))
);
todosRouter.put(
  '/:id',
  isExists,
  todoValidation.update,
  tryCatchMiddleware(todoController.update.bind(todoController))
);
todosRouter.delete(
  '/:id',
  isExists,
  tryCatchMiddleware(todoController.delete.bind(todoController))
);

export default todosRouter;
