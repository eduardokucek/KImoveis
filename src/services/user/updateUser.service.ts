import { Repository } from "typeorm";
import {
  TUserResponse,
  TUserUpdateRequest,
} from "../../interfaces/user/user.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userResponseSchema } from "../../schemas/user/users.schema";

const updateUserService = async (
  updateData: TUserUpdateRequest,
  id: number
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOne({
    where: { id: id },
  });

  const newUserData: User = userRepository.create({
    ...oldUserData,
    ...updateData,
  });

  await userRepository.save(newUserData);

  const updatedUser = userResponseSchema.parse(newUserData);

  return updatedUser;
};

export default updateUserService;
