import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";

const listCategoriesService = async (): Promise<Category[]> => {
  const categoryRespository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const listCategories: Category[] = await categoryRespository
    .createQueryBuilder()
    .getMany();

  return listCategories;
};

export default listCategoriesService;
