import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/errors";

const ensureCategoryAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory: Category | null = await categoryRepository.findOne({
    where: { name: name },
  });

  if (findCategory) throw new AppError("Category already exists", 409);

  return next();
};

export default ensureCategoryAlreadyExistsMiddleware;
