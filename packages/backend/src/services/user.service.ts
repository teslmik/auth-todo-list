import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';

import { appDataSource } from '../config/app-data-source';
import { User } from '../entities';
import { mailService } from './mail.service';
import { tokenService } from './token.service';
import { IUserUpdateDto } from '../types/types';
import { editEmailPasswordBoth, generateRandomPassword } from '../utils';

export default class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  async getHashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  async singUp(email: string, password: string): Promise<{ token: string }> {
    const checkEmail = await this.findUserByEmail(email);

    if (checkEmail) {
      throw new Error(`User with email address ${email} already exists`);
    }

    const activationLink = v4();
    const user: User = await this.userRepository.save({
      email,
      password: await this.getHashPassword(password),
      activationLink
    });
    await mailService.sendActivationMail({
      to: email,
      link: `${process.env.API_URL}/api/user/activate/${activationLink}`
    });

    const token = tokenService.createToken({ id: user.id });

    return { token };
  }

  async signIn(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new Error('Invalid email or password');
    }

    return { token: tokenService.createToken({ id: user.id }) };
  }

  async edit(payload: IUserUpdateDto) {
    const editedPayload = await editEmailPasswordBoth(payload);
    const editedUser = await this.userRepository.save({
      ...editedPayload,
      updatedAt: new Date()
    });

    return editedUser;
  }

  async recovery(email: string) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error(`User with email address ${email} is not registered`);
    }

    const newPassword = generateRandomPassword(8);
    const hashPassword = await this.getHashPassword(newPassword);

    await mailService.sendActivationMail({
      to: email,
      link: newPassword,
      recovery: true
    });

    await this.userRepository.save({ ...user, password: hashPassword });

    return { newPassword: hashPassword };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findUserById(payload: string) {
    const user = await this.userRepository.findOne({ where: { id: payload } });

    return user;
  }

  async findUserByEmail(payload: string) {
    const user = await this.userRepository.findOne({ where: { email: payload } });

    return user;
  }

  async activate(activationLink: string) {
    const user = await this.userRepository.findOne({ where: { activationLink } });
    if (!user) {
      throw new Error('Incorrect activation link!');
    }

    user.isActivated = true;
    await user.save();
  }
}
