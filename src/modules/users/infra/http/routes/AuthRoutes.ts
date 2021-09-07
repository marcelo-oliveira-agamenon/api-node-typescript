import { Router } from 'express';
import multer from 'multer';
import { multerConfig } from '@shared/infra/middlewares/multer';
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

authRouter.post(
  '/signUp',
  multer(multerConfig).single('avatar'),
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      avatar: Joi.object(),
      role: Joi.string().valid('USER', 'ADMIN').required(),
      gender: Joi.string().required(),
      preferences: Joi.array().items(Joi.string())
    }
  }),
  authController.signUp
);

export default authRouter;
