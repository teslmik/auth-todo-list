import { Response, Request, NextFunction } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import { User } from '../entities';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    const todos = await this.todoService.findAll();

    res.json(todos);
  }

  async getOneTodo(req: Request, res: Response) {
    const todo = await this.todoService.findOneById(req.params.id, req.user as User);

    res.json(todo);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const newTodo = await this.todoService.createTodo(req.body, req.user as User);
    res.status(StatusCode.CREATED).json(newTodo);

    next();
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const updatedTodo = await this.todoService.updateTodo(
      req.params.id,
      req.body,
      req.user as User
    );
    res.status(StatusCode.OK).json(updatedTodo);

    next();
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const deletedTodo = await this.todoService.deleteTodo(req.params.id, req.user as User);
    res.json(deletedTodo);

    next();
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
