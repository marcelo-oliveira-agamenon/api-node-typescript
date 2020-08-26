import { Router } from 'express'

import UserController from '../controllers/UserController'

const routes = Router()

routes.get('/api/users/list', UserController.list)

export default routes
