import { Request, Response } from "express";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
} from "../interfaces/user/user.interface";
import createUserService from "../services/user/createUser.service";
import listUsersService from "../services/user/listUsers.service";
import updateUserService from "../services/user/updateUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import {
  TCategoryRequest,
  TCategoryResponse,
} from "../interfaces/realEstate/categories.interfaces";
import createCategoryService from "../services/category/createCategory.service";
import listCategoriesService from "../services/category/listCategories.service";
import { TRealEstateRequest } from "../interfaces/realEstate/realEstate.interfaces";
import createRealEstateService from "../services/realEstate/createRealEstate.service";
import listRealEstatesService from "../services/realEstate/listRealEstates.service";
import { RealEstate } from "../entities";
import createScheduleService from "../services/schedule/createSchedule.service";
import { TScheduleRequest } from "../interfaces/realEstate/schedule.interfaces";
import listCategoryRealEstateService from "../services/category/listCategoryRealEstate.service";
import listScheduleRealEstateService from "../services/schedule/listScheduleRealEstate.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const newUser: TUserResponse = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listUsers: TUserResponse[] = await listUsersService();

  return res.status(200).json(listUsers);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updateData: TUserUpdateRequest = req.body;
  const id: number = parseInt(req.params.id);

  const updatedUser = await updateUserService(updateData, id);

  return res.status(200).json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  await deleteUserService(id);

  return res.status(204).send();
};

const createCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategoryRequest = req.body;

  const newCategory: TCategoryResponse = await createCategoryService(
    categoryData
  );

  return res.status(201).json(newCategory);
};

const listCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listCategories = await listCategoriesService();

  return res.status(200).json(listCategories);
};

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData: TRealEstateRequest = req.body;

  const newRealEstate: RealEstate = await createRealEstateService(
    realEstateData
  );

  return res.status(201).json(newRealEstate);
};

const listRealEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listRealEstates: Array<RealEstate> = await listRealEstatesService();

  return res.status(200).json(listRealEstates);
};

const listCategoryRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);
  const listCategoryRealEstate = await listCategoryRealEstateService(
    categoryId
  );

  return res.status(200).json(listCategoryRealEstate);
};

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const scheduleData: TScheduleRequest = req.body;
  const userId = res.locals.id;

  await createScheduleService(scheduleData, userId);

  return res.status(201).json({ message: "Schedule created" });
};

const listScheduleRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const realEstateId: number = parseInt(req.params.id);
  const userId: number = res.locals.id;

  const listScheduleRealEstate = await listScheduleRealEstateService(
    realEstateId,
    userId
  );

  res.status(200).json(listScheduleRealEstate);
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
  createCategoriesController,
  listCategoriesController,
  createRealEstateController,
  listRealEstatesController,
  createScheduleController,
  listCategoryRealEstateController,
  listScheduleRealEstateController,
};
