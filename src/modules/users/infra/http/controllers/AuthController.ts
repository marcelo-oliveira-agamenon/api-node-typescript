import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SignInUserService from '@modules/users/services/SignInUserService';

export default class AuthController {
  public async signIn(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const signIn = container.resolve(SignInUserService);
    const login = await signIn.execute(email, password);

    return response.json(login);
  }
}
