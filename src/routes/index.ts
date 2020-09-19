import { Router } from "express";

import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";

const routes = Router();

routes.get("/api/users/list", UserController.list);
routes.post("/api/users/add", UserController.create);
routes.delete("/api/users/:id", UserController.delete);
routes.put("/api/users/:id", UserController.update);

routes.post("/api/login", AuthController.login);

export default routes;
