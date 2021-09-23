import { injectable, inject } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { IAuthDTO } from '@modules/users/dtos/IUserDTO';
import AppError from '@shared/errors/index';

@injectable()
class SignInUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute(email: string, password: string): Promise<IAuthDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Não há nenhum usuário com este email cadastrado', 404);
    }

    let authUser: IAuthDTO = {
      token: '',
      user: user
    };

    try {
      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        throw new AppError('Senha incorreta', 401);
      }

      let token = sign(user.id, process.env.JWT_SECRET as string);

      authUser.token = token;
      authUser.user.password = '';
    } catch (error) {
      throw new AppError('Erro inesperado', 500);
    }

    return authUser;
  }
}

export default SignInUserService;
