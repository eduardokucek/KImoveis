import { Repository } from "typeorm";
import { RealEstate, Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/errors";

const listScheduleRealEstateService = async (
  realEstateId: number,
  userId: number
): Promise<RealEstate | null> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate: RealEstate | null =
    await realEstateRepository.findOneBy({ id: realEstateId });

  if (!findRealEstate) throw new AppError("RealEstate not found", 404);

  const listScheduleRealEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("realEstate")
    .innerJoinAndSelect("realEstate.schedules", "schedules")
    .innerJoinAndSelect("realEstate.address", "address")
    .innerJoinAndSelect("realEstate.category", "category")
    .innerJoinAndSelect("schedules.user", "user")
    .where("realEstate.id = :realEstateId", { realEstateId, userId })
    .getOne();

  return listScheduleRealEstate;
};

export default listScheduleRealEstateService;
