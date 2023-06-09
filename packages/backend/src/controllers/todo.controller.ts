import { Response, Request, NextFunction } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    const todos = await this.todoService.findAll();
    res.json(todos);
  }

  async getOneTodo(req: Request, res: Response) {
    const todos = await this.todoService.findOneById(req.params.id);
    res.json(todos);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const newTodo = await this.todoService.createTodo(req.body);
    res.json(newTodo);

    next();
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const updatedTodo = await this.todoService.updateTodo(req.params.id, req.body);
    res.json(updatedTodo);

    next();
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const deletedTodo = await this.todoService.deleteTodo(req.params.id);
    res.json(deletedTodo);

    next();
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
