import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";

const listCategoryRealEstateService = async (
  categoryId: number
): Promise<Category | null> => {
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const listCategoryRealEstate: Category | null = await categoriesRepository
    .createQueryBuilder("categories")
    .leftJoinAndSelect("categories.realEstate", "realEstate")
    .where("categories.id = :categoryId", { categoryId })
    .getOne();

  return listCategoryRealEstate;
};

export default listCategoryRealEstateService;
