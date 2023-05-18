import { Repository } from "typeorm";
import {
  TUserRequest,
  TUserResponse,
} from "../../interfaces/user/user.interface";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userResponseSchema } from "../../schemas/user/users.schema";

const createUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const newUser: User = userRepository.create(userData);
  await userRepository.save(newUser);

  const createdUser = userResponseSchema.parse(newUser);

  return createdUser;
};

export default createUserService;
