import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/prisma/repositories/UserRepository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
