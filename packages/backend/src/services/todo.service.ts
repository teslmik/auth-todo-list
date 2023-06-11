import { Repository } from 'typeorm';

import { appDataSource } from '../config/app-data-source';
import { ITodoRequestDto, IUpdateTodoRequestDto } from '../types/types';
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

  async findOneById(id: string, authUser: User) {
    if (!authUser.isActivated) {
      throw new Error('User is not activated, please check your mail ');
    }

    const todo = await this.todoRepository.findOne({ where: { id }, relations: ['user'] });

    if (todo?.user.id !== authUser.id && todo?.private === true) {
      throw new Error('Access denied');
    }

    const { user, ...restTodo } = todo as Todo;

    return { ...restTodo, userId: user.id };
  }

  async createTodo(
    payload: ITodoRequestDto,
    user: User
  ): Promise<Partial<Todo> & { userId: string }> {
    if (!user.isActivated) {
      throw new Error('User is not activated, please check your mail ');
    }

    const { user: owner, ...restTodo } = await this.todoRepository.save({ ...payload, user });

    return { ...restTodo, userId: owner.id };
  }

  async updateTodo(id: string, payload: IUpdateTodoRequestDto, authUser: User) {
    if (!authUser.isActivated) {
      throw new Error('User is not activated, please check your mail ');
    }

    const currentTodo = await this.todoRepository.findOne({ where: { id } });

    if (currentTodo && currentTodo.private !== payload.private && !currentTodo.private) {
      throw new Error('Access denied');
    }

    await this.todoRepository.update(id, {
      ...payload,
      updatedAt: new Date()
    });

    const updatedTodo = await this.findOneById(id, authUser);

    return updatedTodo;
  }

  async deleteTodo(id: string, user: User) {
    if (!user.isActivated) {
      throw new Error('User is not activated, please check your mail ');
    }

    const deletedTodo = await this.findOneById(id, user);
    await this.todoRepository.delete(id);
    return deletedTodo;
  }
}
