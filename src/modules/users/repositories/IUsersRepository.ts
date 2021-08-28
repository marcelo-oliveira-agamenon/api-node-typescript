import User from '@modules/users/infra/prisma/entities/User';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
}
