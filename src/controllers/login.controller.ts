import { Request, Response } from "express";
import { TLoginRequest } from "../interfaces/login/login.interface";
import createLoginService from "../services/session/createLogin.service";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TLoginRequest = req.body;

  const token: string = await createLoginService(loginData);

  return res.status(200).json({ token: token });
};

export default createLoginController;
