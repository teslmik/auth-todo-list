import { Router } from 'express';

import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('', todoController.getAllTodo.bind(todoController));
todosRouter.post('', todoController.create.bind(todoController));
todosRouter.put('/:id', todoController.update.bind(todoController));

export default todosRouter;
