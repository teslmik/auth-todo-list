import { Response, Request, NextFunction } from 'express';
import { User } from '../entities';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    const todos = await this.todoService.findAll();
    res.json(todos);
  }

  async getOneTodo(req: Request, res: Response) {
    const todo = await this.todoService.findOneById(req.params.id);
    res.json(todo);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.user as User;
    const newTodo = await this.todoService.createTodo(req.body, userId);
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
