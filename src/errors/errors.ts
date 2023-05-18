import { NextFunction, Request, Response, response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }

  console.log(err);

  return response.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, handleErrors };
