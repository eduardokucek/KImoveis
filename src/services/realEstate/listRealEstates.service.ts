import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

const listRealEstatesService = async (): Promise<RealEstate[]> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const listRealEstates: RealEstate[] = await realEstateRepository
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.address", "address")
    .getMany();

  return listRealEstates;
};

export default listRealEstatesService;
