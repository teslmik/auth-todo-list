import { APP_KEYS } from '../modules/common/consts';
import { IUpdateUser, IUser, IUserLogin } from '../modules/common/types';
import HttpService from './http.service';

class UserService extends HttpService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  login(userData: IUserLogin): Promise<string> {
    return this.post({
      url: `${APP_KEYS.BACKEND_KEYS.USER}/${APP_KEYS.BACKEND_KEYS.LOGIN}`,
      data: userData,
      recieveAuthHeader: true
    });
  }

  registration(user: IUserLogin): Promise<string> {
    return this.post({
      url: `${APP_KEYS.BACKEND_KEYS.USER}/${APP_KEYS.BACKEND_KEYS.REGISTER}`,
      data: user,
      recieveAuthHeader: true
    });
  }

  editProfile(userData: IUpdateUser): Promise<IUpdateUser> {
    return this.put(
      {
        url: `${APP_KEYS.BACKEND_KEYS.USER}/${APP_KEYS.BACKEND_KEYS.EDIT}`,
        data: { ...userData }
      },
      true
    );
  }

  recovery(email: string): Promise<string> {
    return this.put(
      {
        url: `${APP_KEYS.BACKEND_KEYS.USER}/${APP_KEYS.BACKEND_KEYS.RECOVERY}`,
        data: { email }
      },
      true
    );
  }

  getUser(): Promise<IUser> {
    return this.get(
      {
        url: `${APP_KEYS.BACKEND_KEYS.USER}/me`
      },
      true
    );
  }
}

const userService = new UserService();
export default userService;
