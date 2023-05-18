import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors/errors";

const ensureUserAlreadyDeletedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const deletedUser: User | null = await userRepository.findOne({
    where: { email: email },
  });

  if (deletedUser?.deletedAt)
    throw new AppError(`User can't signin or be deleted. Not active.`);

  return next();
};

export default ensureUserAlreadyDeletedMiddleware;
