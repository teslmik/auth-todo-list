import { APP_KEYS } from '../modules/common/consts';
import { IUserLogin } from '../modules/common/types';
import HttpService from './http.service';

class UserService extends HttpService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  login(userData: IUserLogin): Promise<{ token: string }> {
    return this.post(
      {
        url: `${APP_KEYS.BACKEND_KEYS.USER}`,
        data: userData
      },
      false
    );
  }

  // registration(user: ITodoCreate): Promise<ITodo> {
  //   return this.post(
  //     {
  //       url: APP_KEYS.BACKEND_KEYS.TODOS,
  //       data: user
  //     },
  //     true
  //   );
  // }

  // editProfile(userData: ITodo): Promise<ITodo> {
  //   return this.put(
  //     {
  //       url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${userData.id}`,
  //       data: { ...userData, id: undefined }
  //     },
  //     true
  //   );
  // }
}

const userService = new UserService();
export default userService;
