import { Request, Response, NextFunction } from 'express';

export default function (auth: Function) {
  return function (request: Request, response: Response, next: NextFunction) {
    const signInEndPoint = request.path === '/auth/signIn' && request.method === 'POST';

    if (signInEndPoint) {
      next();
    } else {
      auth(request, response, next);
    }
  };
}
