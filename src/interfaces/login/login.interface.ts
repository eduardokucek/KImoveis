import { z } from "zod";
import { loginRequestSchema } from "../../schemas/login/login.schema";

type TLoginRequest = z.infer<typeof loginRequestSchema>;

export { TLoginRequest };
