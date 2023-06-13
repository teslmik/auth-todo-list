export interface IUserUpdateDto {
  id: string;
  token: string;
  email?: string;
  password?: string;
  newPassword?: string;
  repeatPassword?: string;
}
