import { Repository } from "typeorm";
import { TRealEstateRequest } from "../../interfaces/realEstate/realEstate.interfaces";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

const createRealEstateService = async (
  realEstateData: TRealEstateRequest
): Promise<RealEstate> => {
  const categoryId: number = realEstateData.categoryId;
  const addressData = realEstateData.address;

  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const category: Category | null = await categoryRepository.findOneBy({
    id: categoryId,
  });

  const newAddress: Address = addressRepository.create(addressData);
  await addressRepository.save(newAddress);

  const newRealEstate: RealEstate = realEstateRepository.create({
    ...realEstateData,
    address: newAddress,
    category: category!,
  });
  await realEstateRepository.save(newRealEstate);

  return newRealEstate;
};

export default createRealEstateService;
