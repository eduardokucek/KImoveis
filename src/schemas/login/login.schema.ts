import { z } from "zod";

const loginRequestSchema = z.object({
  email: z.string().email().max(45),
  password: z.string(),
});

export { loginRequestSchema };
