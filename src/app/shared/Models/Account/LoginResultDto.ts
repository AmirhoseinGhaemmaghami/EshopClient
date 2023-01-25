export interface LoginResultDto {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  tokenExpireDate: string;
  isActivated: true;
}
