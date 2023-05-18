import { Repository } from "typeorm";
import { Category } from "../../entities";
import {
  TCategoryRequest,
  TCategoryResponse,
} from "../../interfaces/realEstate/categories.interfaces";
import { AppDataSource } from "../../data-source";
import { categoryResponseSchema } from "../../schemas/category/category.schema";

const createCategoryService = async (
  categoryData: TCategoryRequest
): Promise<TCategoryResponse> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const newCategory: Category = categoryRepository.create(categoryData);
  await categoryRepository.save(newCategory);

  const createdCategory = categoryResponseSchema.parse(newCategory);

  return createdCategory;
};

export default createCategoryService;
