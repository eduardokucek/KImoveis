import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/errors";

const ensureUserIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { admin } = res.locals;
  const { id } = res.locals;
  const idParams: string = req.params.id;

  if (admin) return next();

  if (!admin && id === idParams) return next();

  if (!admin && id !== idParams)
    throw new AppError("Insufficient permission", 403);

  return next();
};

export default ensureUserIsAdminMiddleware;
