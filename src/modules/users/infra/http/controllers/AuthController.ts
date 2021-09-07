import { container } from 'tsyringe';
import { Request, Response, Express } from 'express';

import SignInUserService from '@modules/users/services/SignInUserService';
import SignUpUserService from '@modules/users/services/SignUpUserService';

interface IFile extends Express.Multer.File {
  location: string;
  key: string;
}

export default class AuthController {
  public async signIn(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const signIn = container.resolve(SignInUserService);
    const login = await signIn.execute(email, password);

    return response.json(login);
  }

  public async signUp(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const file = request.file as IFile;
    const avatar = {
      path: file.location,
      name: file.key
    };
    data.avatar = avatar;

    const signUp = container.resolve(SignUpUserService);
    const user = await signUp.execute(data);

    return response.json(user);
  }
}
