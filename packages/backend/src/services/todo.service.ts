import { Repository } from 'typeorm';

import { appDataSource } from '../config/app-data-source';
import { ISearchParams, ITodoRequestDto, IUpdateTodoRequestDto } from '../types';
import { Todo, User } from '../entities';
import { TodoStatus } from '../enums';

export default class TodoService {
  private readonly todoRepository: Repository<Todo>;

  constructor() {
    this.todoRepository = appDataSource.getRepository(Todo);
  }

  async findAll(currentUser: User, { search, status, page, pageSize }: ISearchParams) {
    const query = this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .where('(todo.user.id = :userId OR (todo.private = false AND todo.user.id != :userId))')
      .andWhere('(todo.title LIKE :search OR todo.description LIKE :search)', {
        userId: currentUser.id,
        search: `%${search || ''}%`
      });

    if (status === TodoStatus.PUBLIC) {
      query.andWhere('todo.private = :isPrivateFalse', { isPrivateFalse: false });
    } else if (status === TodoStatus.PRIVATE) {
      query.andWhere('todo.private = :isPrivateTrue', { isPrivateTrue: true });
    } else if (status === TodoStatus.COMPLETED) {
      query.andWhere('todo.completed = :completed', { completed: true });
    }

    const totalCount = await query.getCount();

    query
      .orderBy('todo.createdAt', 'DESC')
      .skip((page - 1 || 0) * pageSize)
      .take(pageSize);

    const todos = await query.getMany();

    const result = todos.map((todo) => {
      const { user, ...restTodo } = todo;
      return { ...restTodo, userId: user.id };
    });

    return {
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      pageSize,
      data: result
    };
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

    const currentTodo = await this.todoRepository.findOne({ where: { id }, relations: ['user'] });

    if (
      currentTodo &&
      currentTodo.private !== payload.private &&
      !currentTodo.private &&
      currentTodo.user.id !== authUser.id
    ) {
      throw new Error('Access denied');
    }

    await this.todoRepository.update(id, {
      ...payload,
      updatedAt: new Date()
    });

    const updatedTodo = await this.todoRepository.findOne({ where: { id } });

    return updatedTodo;
  }

  async deleteTodo(id: string, authUser: User) {
    const currentTodo = await this.todoRepository.findOne({ where: { id }, relations: ['user'] });

    if (currentTodo && currentTodo.user.id !== authUser.id) {
      throw new Error('Access denied');
    }

    if (!authUser.isActivated) {
      throw new Error('User is not activated, please check your mail ');
    }

    const deletedTodo = await this.findOneById(id, authUser);
    await this.todoRepository.delete(id);
    return deletedTodo;
  }
}
