import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureDataIsValidMiddleWare =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validateData = schema.parse(req.body);

    if (req.body.address) req.body.address = validateData;

    req.body = validateData;

    return next();
  };

export default ensureDataIsValidMiddleWare;
