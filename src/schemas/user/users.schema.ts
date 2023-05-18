import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const userRequestSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userResponseSchema = userSchema.omit({ password: true });

const usersResponseSchema = z.array(userResponseSchema);

const userUpdateRequestSchema = userSchema
  .omit({ id: true, admin: true })
  .partial();

export {
  userSchema,
  userRequestSchema,
  userResponseSchema,
  userUpdateRequestSchema,
  usersResponseSchema,
};
