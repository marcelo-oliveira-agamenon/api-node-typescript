import { PrismaClient } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/prisma/entities/User';

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
}

export default UserRepository;
