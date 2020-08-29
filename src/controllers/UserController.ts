import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserController {
  public async list (req: Request, res: Response): Promise<Response> {
    const allusers = await prisma.user.findMany()
    return res.status(200).send({ data: allusers })
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { name, email, password, image } = req.body

    const create = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        imageUrl: image,
        role: 'USER'
      }
    })

    return res.status(200).json('Usuário criado')
  }
}

export default new UserController()
