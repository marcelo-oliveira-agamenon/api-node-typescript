import { Request, Response } from 'express'

class UserController {
  public async list (req: Request, res: Response): Promise<Response> {
    return res.send('dasas')
  }
}

export default new UserController()
