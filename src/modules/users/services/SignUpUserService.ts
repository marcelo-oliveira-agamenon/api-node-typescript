import { injectable, inject } from 'tsyringe';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { ISignUpDTO } from '@modules/users/dtos/IUserDTO';
import AppError from '@shared/errors/index';

@injectable()
class SignUpUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute(data: ISignUpDTO): Promise<ISignUpDTO> {
    const { email, gender, name, password, preferences, role, avatar } = data;
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new AppError('Já existe um usuário com este email', 403);
    }

    const user: ISignUpDTO = {
      id: v4(),
      name,
      gender,
      email,
      preferences,
      role,
      avatar,
      password,
      createdAt: new Date(),
      modifiedAt: new Date()
    };

    hash(password, 10, (err, pass) => {
      if (err) {
        throw new AppError('Erro Inesperado', 500);
      }

      user.password = pass;
    });

    const newUser = await this.userRepository.create(data);

    return newUser;
  }
}

export default SignUpUserService;
