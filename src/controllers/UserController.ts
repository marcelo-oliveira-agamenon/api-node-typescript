import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/User'

export class UserController {
  public async list (req: Request, res: Response): Promise<Response> {
    const allUsers: Array<User> = await User.scope('withouPassword').findAll({})
    return res.status(200).send({ data: allUsers })
  }
}

export default new UserController()
