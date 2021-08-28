import { JsonValue } from '@prisma/client';

export default class User {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.gender = user.gender;
    this.password = user.password;
    this.name = user.name;
    this.avatar = user.avatar;
    this.role = user.role;
    this.preferences = user.preferences;
    this.createdAt = user.createdAt;
    this.modifiedAt = user.modifiedAt;
  }

  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public avatar: JsonValue;
  public role: 'USER' | 'ADMIN';
  public gender: string;
  public preferences: string[];
  public createdAt: Date;
  public modifiedAt: Date;
}
