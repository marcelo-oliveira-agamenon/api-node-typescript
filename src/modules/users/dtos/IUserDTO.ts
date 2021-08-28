import User from '@modules/users/infra/prisma/entities/User';

export interface IAuthDTO {
  user: User;
  token: string;
}
