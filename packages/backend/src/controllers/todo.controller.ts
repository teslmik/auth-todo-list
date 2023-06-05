import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    // TODO: Write your implementation here
    const todos = await this.todoService.findAll();
    res.send(todos);
  }

  async createNewTodo(req: Request, res: Response) {
    try {
      const newTodo = await this.todoService.createTodo(req.body);
      res.send(newTodo);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      throw new Error(error);
    }
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
