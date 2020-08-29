import { Router } from 'express'

import UserController from '../controllers/UserController'

const routes = Router()

routes.get('/api/users/list', UserController.list)
routes.post('/api/users/add', UserController.create)
routes.delete('/api/users/:id', UserController.delete)
routes.put('/api/users/:id', UserController.update)

export default routes
