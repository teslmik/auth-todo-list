import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';

import { appDataSource } from '../config/app-data-source';
import { User } from '../entities/entities';
// import { tokenService } from './token.service';

export default class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async singUp(email: string, password: string): Promise<User> {
    const checkEmail = await this.userRepository.findOne({ where: { email } });

    if (checkEmail) {
      throw new Error(`User with email address ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();
    const user: User = await this.userRepository.save({
      email,
      password: hashPassword,
      activationLink
    });

    // await mailService.sendActivationMail({
    //   to: email,
    //   link: `${process.env.API_URL}/api/activate/${activationLink}`
    // });

    // const tokens = tokenService.generateToken({ ...user });
    // await tokenService.saveToken(user.id, tokens.refreshToken);

    return user;
  }

  // async findOneById(id: string) {
  //   const todo = await this.userRepository.findOneBy({ id });

  //   return todo;
  // }
  // async singIn() {}

  // async updateTodo(id: string, payload: Todo) {
  //   await this.userRepository.update(id, payload);
  //   const updatedTodo = await this.findOneById(id);
  //   return updatedTodo;
  // }

  // async deleteTodo(id: string) {
  //   const deletedTodo = await this.findOneById(id);
  //   await this.userRepository.delete(id);
  //   return deletedTodo;
  // }
}
