import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TUsersResponse } from "../../interfaces/user/user.interface";
import { usersResponseSchema } from "../../schemas/user/users.schema";

const listUsersService = async (): Promise<TUsersResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: User[] = await userRepository.createQueryBuilder().getMany();

  return usersResponseSchema.parse(findUsers);
};

export default listUsersService;
