import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import 'dotenv/config';
import routes from '@shared/infra/routes';
import 'shared/container';
import AppError from '@shared/errors';

const app = express();

app.use(express.json(), cors());
app.use(routes);
app.use(errors());
app.use((err: Error, __: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.status).json(err.error);
  }

  return response.status(500).json(err.message);
});

export default app;
