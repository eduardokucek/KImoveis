import { z } from "zod";
import {
  userRequestSchema,
  userResponseSchema,
  userSchema,
  usersResponseSchema,
} from "../../schemas/user/users.schema";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userRequestSchema>;
type TUserResponse = z.infer<typeof userResponseSchema>;
type TUserUpdateRequest = DeepPartial<TUserRequest>;
type TUsersResponse = z.infer<typeof usersResponseSchema>;

export {
  TUser,
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
  TUsersResponse,
};
