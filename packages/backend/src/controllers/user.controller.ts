import { Response, Request, NextFunction } from 'express';
import UserService from '../services/user.service';
import { User } from '../entities';

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password }: User = req.body;

    const userData = await this.userService.singUp(email, password);
    res.json(userData);

    next();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: User = req.body;
    const userData = await this.userService.signIn(email, password);

    res.json(userData);

    next();
  }

  async getAllUsers(_: Request, res: Response) {
    const users = await this.userService.findAll();
    res.json(users);
  }

  async getOneUserById(req: Request, res: Response) {
    const user = await this.userService.findUserById(req.params.id);
    res.json(user);
  }
}

const userController = new UserController(new UserService());
export default userController;
