import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import UserService from '../services/user.service';
import { tokenService } from '../services/token.service';
import { IUserUpdateDto, IEditedUserData } from '../types/types';
import { mailService } from '../services/mail.service';

export const editEmailPasswordBoth = async (payload: IUserUpdateDto): Promise<IEditedUserData> => {
  const userService = new UserService();
  const { token, ...restPayload } = payload;
  const { id } = tokenService.validateToken(token) as { id: string };
  const user = await userService.findUserById(id);

  if (!user) {
    throw new Error('Unauthorized');
  }
  if (!user.isActivated) {
    throw new Error('User is not activated, please check your mail ');
  }

  const updatedPayload: Partial<IUserUpdateDto> & {
    id: string;
    isActivated?: boolean;
    activationLink?: string;
  } = {
    ...restPayload,
    id
  };

  if (payload.email) {
    updatedPayload.email = payload.email;
  }

  if (payload.password || payload.newPassword) {
    if (!payload.password || !payload.newPassword) {
      throw new Error('When changing the password, both fields must be completed');
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);

    if (!isMatch) {
      throw new Error('Current password is incorrect.');
    }

    updatedPayload.password = await bcrypt.hash(payload.newPassword, 3);
  }

  updatedPayload.isActivated = false;
  updatedPayload.activationLink = v4();

  await mailService.sendActivationMail({
    to: payload.email ?? user.email,
    link: `${process.env.API_URL}/api/user/activate/${updatedPayload.activationLink}`
  });

  delete updatedPayload.token;
  delete updatedPayload.newPassword;

  return updatedPayload;
};
