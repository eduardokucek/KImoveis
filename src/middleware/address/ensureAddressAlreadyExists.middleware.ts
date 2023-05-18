import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Address } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/errors";

const ensureAddressAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { street } = req.body.address;

  if (!street) throw new AppError("Invalid street", 400);

  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const findedAddress: Address | null = await addressRepository.findOne({
    where: { street: street },
  });

  if (findedAddress) throw new AppError("Address already exists", 409);

  return next();
};

export default ensureAddressAlreadyExistsMiddleware;
