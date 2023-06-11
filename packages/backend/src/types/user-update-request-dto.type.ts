export interface IUserUpdateDto {
  token: string;
  email?: string;
  password?: string;
  newPassword?: string;
  repeatPassword?: string;
}
