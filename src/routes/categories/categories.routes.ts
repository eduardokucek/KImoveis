import { Router } from "express";
import {
  createCategoriesController,
  listCategoriesController,
  listCategoryRealEstateController,
} from "../../controllers/realEstate.controllers";
import ensureTokenIsValidMiddleware from "../../middleware/ensureTokenIsvalid.middleware";
import ensureUserIsAdminMiddleware from "../../interfaces/user/ensureUserIsAdmin.middleware";
import ensureDataIsValidMiddleWare from "../../middleware/ensureDataIsValid.middleware";
import { categoryRequestSchema } from "../../schemas/category/category.schema";
import ensureCategoryAlreadyExistsMiddleware from "../../middleware/category/ensureCategoryAlreadyExists.middleware";
import ensureCategoryExistsMiddleware from "../../middleware/category/ensureCategoryExists.middleware";

const categoriesRoute: Router = Router();

categoriesRoute.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureDataIsValidMiddleWare(categoryRequestSchema),
  ensureCategoryAlreadyExistsMiddleware,
  createCategoriesController
);

categoriesRoute.get("", listCategoriesController);

categoriesRoute.get(
  "/:id/realEstate",
  ensureCategoryExistsMiddleware,
  listCategoryRealEstateController
);

export default categoriesRoute;
