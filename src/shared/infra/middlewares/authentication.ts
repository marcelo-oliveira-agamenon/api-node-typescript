import { decode, verify } from 'jsonwebtoken';
import AppError from '@shared/errors';
import { Request, Response, NextFunction } from 'express';

export default function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  let bearer = request.header('Authorization');

  if (!bearer) {
    throw new AppError('Access Denied! No token found');
  }

  bearer = bearer.replace('Bearer ', '');

  const authCheck = verify(bearer, process.env.JWT_SECRET as string);

  if (!authCheck) {
    throw new AppError('Access denied! Invalid token');
  }

  const userId = decode(bearer);

  if (userId && typeof userId === 'string') {
    request.user = userId;
  }

  next();
}
