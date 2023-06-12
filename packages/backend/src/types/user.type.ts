export interface IUser {
  id: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  createdAt: string;
  updatedAt: string;
}
