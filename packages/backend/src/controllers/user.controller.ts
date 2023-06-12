import { Response, Request, NextFunction } from 'express';
import UserService from '../services/user.service';
import { tokenService } from '../services/token.service';
import { User } from '../entities';
import { StatusCode } from '../enums/status-code.enum';

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password }: User = req.body;

    const userData = await this.userService.singUp(email, password);
    res.status(StatusCode.CREATED).json(userData);

    next();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: User = req.body;
    const userData = await this.userService.signIn(email, password);

    res.json(userData);

    next();
  }

  async editUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    const { id, email, updatedAt, isActivated } = await this.userService.edit({
      ...req.body,
      token
    });

    res.json({ id, email, updatedAt, isActivated });

    next();
  }

  async recoveryPassword(req: Request, res: Response, next: NextFunction) {
    const hashPassword = await this.userService.recovery(req.body.email);

    res.json(hashPassword);

    next();
  }

  async getAllUsers(_: Request, res: Response) {
    const users = await this.userService.findAll();
    res.json(users);
  }

  async getOneUserById(req: Request, res: Response) {
    const { id } = tokenService.validateToken(req.headers.authorization as string) as {
      id: string;
    };

    const user = await this.userService.findUserById(id);
    res.json(user);
  }

  async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await this.userService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL as string);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController(new UserService());
export default userController;
