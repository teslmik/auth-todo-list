import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    // TODO: Write your implementation here
    const todos = await this.todoService.findAll();
    res.send(todos);
  }

  async create(req: Request, res: Response) {
    try {
      const newTodo = await this.todoService.createTodo(req.body);
      res.send(newTodo);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      throw new Error(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedTodo = await this.todoService.updateTodo(req.params.id, req.body);
      res.send(updatedTodo);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      throw new Error(error);
    }
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
