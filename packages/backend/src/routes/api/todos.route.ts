import { Router } from 'express';

import { checkAuth, isExists, todoValidation, tryCatchMiddleware } from '../../middleware';
import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('', checkAuth, tryCatchMiddleware(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
  '/:id',
  checkAuth,
  isExists,
  tryCatchMiddleware(todoController.getOneTodo.bind(todoController))
);
todosRouter.post(
  '',
  checkAuth,
  todoValidation.create,
  tryCatchMiddleware(todoController.create.bind(todoController))
);
todosRouter.put(
  '/:id',
  checkAuth,
  isExists,
  todoValidation.update,
  tryCatchMiddleware(todoController.update.bind(todoController))
);
todosRouter.delete(
  '/:id',
  checkAuth,
  isExists,
  tryCatchMiddleware(todoController.delete.bind(todoController))
);

export default todosRouter;
