import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthController from '@modules/users/infra/http/controllers/AuthController';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/signIn',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }),
  authController.signIn
);

export default authRouter;
