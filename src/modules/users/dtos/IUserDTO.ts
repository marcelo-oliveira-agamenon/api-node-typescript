import User from '@modules/users/infra/prisma/entities/User';
import { JsonValue } from '@prisma/client';

export interface IAuthDTO {
  user: User;
  token: string;
}

export interface ISignUpDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: JsonValue;
  role: 'USER' | 'ADMIN';
  gender: string;
  preferences: string[];
  createdAt: Date;
  modifiedAt: Date;
}
