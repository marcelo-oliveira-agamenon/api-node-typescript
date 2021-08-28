import { Router } from 'express';

import AuthRoutes from '@modules/users/infra/http/routes/AuthRoutes';

const routes = Router();

routes.use('/auth', AuthRoutes);

export default routes;
