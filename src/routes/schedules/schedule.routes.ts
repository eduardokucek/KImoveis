import { Router } from "express";
import {
  createScheduleController,
  listScheduleRealEstateController,
} from "../../controllers/realEstate.controllers";
import ensureTokenIsValidMiddleware from "../../middleware/ensureTokenIsvalid.middleware";
import ensureDataIsValidMiddleWare from "../../middleware/ensureDataIsValid.middleware";
import { scheduleRequestSchema } from "../../schemas/schedule/schedule.schema";
import ensureUserIsAdminDeleteMiddleware from "../../interfaces/user/ensureUserisAdminDelete.middleware";

const scheduleRoute: Router = Router();

scheduleRoute.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleWare(scheduleRequestSchema),
  createScheduleController
);

scheduleRoute.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminDeleteMiddleware,
  listScheduleRealEstateController
);

export default scheduleRoute;
