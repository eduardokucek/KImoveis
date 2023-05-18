import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/errors";

const ensureEmailAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userFind: User | null = await userRepository.findOneBy({
    email: email,
  });

  if (userFind) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default ensureEmailAlreadyExistsMiddleware;
