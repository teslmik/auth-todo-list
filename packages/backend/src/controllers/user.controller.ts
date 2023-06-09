import { Response, Request, NextFunction } from 'express';
import { User } from '../entities/entities';
import UserService from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  // async getAllTodo(_: Request, res: Response) {
  //   const todos = await this.userService.findAll();
  //   res.json(todos);
  // }

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password }: User = req.body;

    const userData = await this.userService.singUp(email, password);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
    });

    res.json(userData);

    next();
  }

  // async update(req: Request, res: Response, next: NextFunction) {
  //   const updatedTodo = await this.userService.updateTodo(req.params.id, req.body);
  //   res.json(updatedTodo);

  //   next();
  // }

  // async delete(req: Request, res: Response, next: NextFunction) {
  //   const deletedTodo = await this.userService.deleteTodo(req.params.id);
  //   res.json(deletedTodo);

  //   next();
  // }
}

const userController = new UserController(new UserService());
export default userController;
