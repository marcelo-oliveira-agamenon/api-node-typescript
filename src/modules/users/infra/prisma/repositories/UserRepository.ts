import { PrismaClient } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/prisma/entities/User';
import { ISignUpDTO } from '@modules/users/dtos/IUserDTO';

class UserRepository implements IUsersRepository {
  private ormRepository: PrismaClient;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.user.findFirst({
      where: {
        email
      }
    });

    return user;
  }

  public async create(data: ISignUpDTO): Promise<User> {
    const user = await this.ormRepository.user.create({ data });

    return user;
  }
}

export default UserRepository;
