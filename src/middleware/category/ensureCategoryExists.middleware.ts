import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/errors";
import { Category } from "../../entities";

const ensureCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId: number = Number(req.params.id);

  const userRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findUser: Category | null = await userRepository.findOneBy({
    id: categoryId,
  });

  if (!findUser) throw new AppError("Category not found", 404);

  return next();
};

export default ensureCategoryExistsMiddleware;
