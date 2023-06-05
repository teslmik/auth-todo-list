import { Repository } from 'typeorm';

import { ITodoRequestDto } from '../types/types';
import { myDataSource } from '../config/database';
import { Todo } from '../entities/todo.entity';

export default class TodoService {
  private readonly todoRepository: Repository<Todo>;

  constructor() {
    this.todoRepository = myDataSource.getRepository(Todo);
  }

  async findAll() {
    const todos = await this.todoRepository.find();
    return todos;
  }

  async findOneById(id: string) {
    const todo = await this.todoRepository.findOneBy({ id });
    return todo;
  }

  async createTodo(payload: ITodoRequestDto): Promise<Todo> {
    const newTodo: Todo = await this.todoRepository.save(payload);
    return newTodo;
  }

  async updateTodo(id: string, payload: ITodoRequestDto) {
    await this.todoRepository.update(id, payload);
    const updatedTodo = await this.findOneById(id);
    return updatedTodo;
  }

  // async deleteTodo() {
  // }
}
