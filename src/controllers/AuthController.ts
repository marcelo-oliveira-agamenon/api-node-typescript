import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Missing fields in request body" });
    }

    let user;
    try {
      user = await prisma.user.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res
          .status(400)
          .json("There is no user with this email in database");
      }
    } catch (error) {
      return res.status(500).send({
        error: error,
      });
    }

    try {
      const checkPassword = await compare(password, user.password);
      if (checkPassword === false) {
        return res.status(401).json("Incorrect password");
      }
    } catch (error) {
      return res.status(500).send({
        error: error,
      });
    }

    let token;
    try {
      token = await sign(user, process.env.JWT_SECRET, {
        expiresIn: 7200,
      });
      return res.status(200).send({
        ...user,
        token: token,
      });
    } catch (error) {
      return res.status(500).send({
        error: error,
      });
    }
  }
}

export default new AuthController();
