import User from '@modules/users/infra/prisma/entities/User';
import { ISignUpDTO } from '@modules/users/dtos/IUserDTO';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: ISignUpDTO): Promise<User>;
}
