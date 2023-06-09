import { Repository } from 'typeorm';

import { appDataSource } from '../config/app-data-source';
import { Todo } from '../entities/entities';

export default class TodoService {
  private readonly todoRepository: Repository<Todo>;

  constructor() {
    this.todoRepository = appDataSource.getRepository(Todo);
  }

  async findAll() {
    const todos = await this.todoRepository.find();
    return todos;
  }

  async findOneById(id: string) {
    const todo = await this.todoRepository.findOneBy({ id });

    return todo;
  }

  async createTodo(payload: Todo): Promise<Todo> {
    const newTodo = await this.todoRepository.save(payload);
    return newTodo;
  }

  async updateTodo(id: string, payload: Todo) {
    await this.todoRepository.update(id, payload);
    const updatedTodo = await this.findOneById(id);
    return updatedTodo;
  }

  async deleteTodo(id: string) {
    const deletedTodo = await this.findOneById(id);
    await this.todoRepository.delete(id);
    return deletedTodo;
  }
}
