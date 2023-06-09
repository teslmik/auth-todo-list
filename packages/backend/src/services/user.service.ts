/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';

import { createToken } from '../middleware';
import { appDataSource } from '../config/app-data-source';
import { User } from '../entities';

export default class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  async singUp(email: string, password: string): Promise<string> {
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

    const token = createToken(user.id);

    return token;
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new Error('Invalid email or password');
    }

    return { token: createToken(user.id), user };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }
}
