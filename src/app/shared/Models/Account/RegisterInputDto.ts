export class RegisterInputDto {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public address: string
  ) {}
}
