import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

const prisma = new PrismaClient();

export class UserController {
  public async list(req: Request, res: Response): Promise<Response> {
    const allusers = await prisma.user.findMany();
    return res.status(200).send({ data: allusers });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      gender,
      role,
      avatar,
      preferences,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !role ||
      !avatar ||
      !preferences
    ) {
      return res.status(400).send({
        error: "Missing fields in request body",
      });
    }

    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const create = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          gender,
          avatar,
          role,
          preferences,
          modifiedAt: new Date(),
        },
      });
      return res.status(201).send({
        message: "User Created",
        user: create,
      });
    } catch (err) {
      return res.status(400).send({
        error: err,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    return res.send(body);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const dele = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).send({
        message: "User deleted",
        user: dele,
      });
    } catch (err) {
      return res.status(400).send({
        error: err,
      });
    }
  }
}

export default new UserController();
