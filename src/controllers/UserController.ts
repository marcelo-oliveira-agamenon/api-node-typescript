import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { genSalt, hash } from 'bcrypt'

const prisma = new PrismaClient()

export class UserController {
  public async list (req: Request, res: Response): Promise<Response> {
    const allusers = await prisma.user.findMany()
    return res.status(200).send({ data: allusers })
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { name, email, password, image, role } = req.body

    if (!name || !email || !password || !image || !role) {
      return res.status(400).send({
        error: 'Missing fields in request body'
      })
    }

    try {
      const salt = await genSalt(10)
      const hashedPassword = await hash(password, salt)
      const create = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          imageUrl: image,
          role: role,
          modifiedAt: new Date()
        }
      })
      return res.status(200).send({
        message: 'User Created',
        user: create
      })
    } catch (err) {
      return res.status(400).send({
        error: err
      })
    }
  }
}

export default new UserController()
