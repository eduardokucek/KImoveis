import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";

const deleteUserService = async (userId: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  await userRepository
    .createQueryBuilder()
    .softDelete()
    .where({ id: userId })
    .execute();
};

export default deleteUserService;
