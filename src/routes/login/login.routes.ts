import { Router } from "express";
import ensureDataIsValidMiddleWare from "../../middleware/ensureDataIsValid.middleware";
import { loginRequestSchema } from "../../schemas/login/login.schema";
import createLoginController from "../../controllers/login.controller";
import ensureUserIsActiveMiddleware from "../../middleware/user/ensureUserAlreadyDeleted.middleware";

const loginRoute: Router = Router();

loginRoute.post(
  "",
  ensureDataIsValidMiddleWare(loginRequestSchema),
  ensureUserIsActiveMiddleware,
  createLoginController
);

export default loginRoute;
