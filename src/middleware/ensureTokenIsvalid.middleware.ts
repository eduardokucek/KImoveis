import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import jwt from "jsonwebtoken";

const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined = req.headers.authorization;

  if (!token) throw new AppError("Missing bearer token", 401);

  const tokenExists = token.split(" ")[1];

  jwt.verify(
    tokenExists,
    String(process.env.SECRET_KEY!),
    (err: any, decoded: any) => {
      if (err) throw new AppError(err.message, 401);
      res.locals.id = decoded.sub;
      res.locals.admin = decoded.admin;
    }
  );

  return next();
};

export default ensureTokenIsValidMiddleware;
