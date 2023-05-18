import { Router } from "express";
import ensureTokenIsValidMiddleware from "../../middleware/ensureTokenIsvalid.middleware";
import ensureUserIsAdminMiddleware from "../../interfaces/user/ensureUserIsAdmin.middleware";
import ensureDataIsValidMiddleWare from "../../middleware/ensureDataIsValid.middleware";
import { realEstateRequestSchema } from "../../schemas/realEstate/realEstate.schema";
import {
  createRealEstateController,
  listRealEstatesController,
} from "../../controllers/realEstate.controllers";
import ensureAddressAlreadyExistsMiddleware from "../../middleware/address/ensureAddressAlreadyExists.middleware";

const realEstateRoute: Router = Router();

realEstateRoute.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureDataIsValidMiddleWare(realEstateRequestSchema),
  ensureAddressAlreadyExistsMiddleware,
  createRealEstateController
);

realEstateRoute.get("", listRealEstatesController);

export default realEstateRoute;
