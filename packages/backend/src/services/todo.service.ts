import { Repository } from 'typeorm';

import { appDataSource } from '../config/app-data-source';
import { ITodoRequestDto } from '../types/types';
import { Todo, User } from '../entities';

export default class TodoService {
  private readonly todoRepository: Repository<Todo>;

  constructor() {
    this.todoRepository = appDataSource.getRepository(Todo);
  }

  async findAll() {
    const todos = await this.todoRepository.find({
      where: { private: false },
      order: { createdAt: 'DESC' },
      relations: ['user']
    });

    const result = todos.map((todo) => {
      const { user, ...restTodo } = todo;
      return { ...restTodo, userId: user.id };
    });

    return result;
  }

  async findOneById(id: string) {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
        private: false
      },
      relations: ['user']
    });

    const { user, ...restTodo } = todo as Todo;

    return { ...restTodo, userId: user.id };
  }

  async createTodo(
    payload: ITodoRequestDto,
    user: User
  ): Promise<Partial<Todo> & { userId: string }> {
    const { user: owner, ...restTodo } = await this.todoRepository.save({ ...payload, user });
    return { ...restTodo, userId: owner.id };
  }

  async updateTodo(id: string, payload: Todo) {
    await this.todoRepository.update(id, {
      ...payload,
      updatedAt: new Date()
    });
    const updatedTodo = await this.findOneById(id);
    return updatedTodo;
  }

  async deleteTodo(id: string) {
    const deletedTodo = await this.findOneById(id);
    await this.todoRepository.delete(id);
    return deletedTodo;
  }
}
