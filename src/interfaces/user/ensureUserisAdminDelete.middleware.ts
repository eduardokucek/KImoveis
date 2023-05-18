import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/errors";

const ensureUserIsAdminDeleteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { admin } = res.locals;

  if (admin) return next();

  if (!admin) throw new AppError("Insufficient permission", 403);

  return next();
};

export default ensureUserIsAdminDeleteMiddleware;
