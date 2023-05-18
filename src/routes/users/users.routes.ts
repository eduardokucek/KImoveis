import { Router } from "express";
import ensureDataIsValidMiddleWare from "../../middleware/ensureDataIsValid.middleware";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../../controllers/realEstate.controllers";
import {
  userRequestSchema,
  userUpdateRequestSchema,
} from "../../schemas/user/users.schema";
import ensureEmailAlreadyExistsMiddleware from "../../middleware/ensureEmailAlreadyExists.middleware";
import ensureTokenIsValidMiddleware from "../../middleware/ensureTokenIsvalid.middleware";
import ensureUserIsAdminMiddleware from "../../interfaces/user/ensureUserIsAdmin.middleware";
import ensureUserIsAdminDeleteMiddleware from "../../interfaces/user/ensureUserisAdminDelete.middleware";
import ensureUserAlreadyDeletedMiddleware from "../../middleware/user/ensureUserAlreadyDeleted.middleware";
import ensureUserExistsMiddleware from "../../interfaces/user/ensureUserExists.middleware";

const usersRoute: Router = Router();

usersRoute.post(
  "",
  ensureDataIsValidMiddleWare(userRequestSchema),
  ensureEmailAlreadyExistsMiddleware,
  createUserController
);

usersRoute.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  listUsersController
);

usersRoute.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleWare(userUpdateRequestSchema),
  ensureUserExistsMiddleware,
  ensureUserIsAdminMiddleware,
  updateUserController
);

usersRoute.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureUserIsAdminDeleteMiddleware,
  ensureUserAlreadyDeletedMiddleware,
  deleteUserController
);

export default usersRoute;
