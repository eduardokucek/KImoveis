import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/errors";

const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: number = Number(req.params.id);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOneBy({ id: userId });

  if (!findUser) throw new AppError("User not found", 404);

  return next();
};

export default ensureUserExistsMiddleware;
