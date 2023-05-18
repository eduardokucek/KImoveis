import { Repository } from "typeorm";
import { TScheduleRequest } from "../../interfaces/realEstate/schedule.interfaces";
import { RealEstate, Schedule, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/errors";

const createScheduleService = async (
  scheduleData: TScheduleRequest,
  userId: number
): Promise<void> => {
  const { date, hour, realEstateId } = scheduleData;
  const scheduleDate: number = new Date(scheduleData.date).getDay();
  const scheduleHour: string = scheduleData.hour;

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const realEstate: RealEstate | null = await realEstateRepository.findOneBy({
    id: realEstateId,
  });
  const user: User | null = await userRepository.findOneBy({ id: userId });

  if (!realEstate) throw new AppError("RealEstate not found", 404);

  const scheduleSameDateHourUserExists = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .andWhere("schedule.userId = :userId", { userId })
    .getCount();

  if (scheduleSameDateHourUserExists > 0)
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );

  const scheduleSameDateHourExists = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .andWhere("schedule.realEstateId = :realEstateId", { realEstateId })
    .getCount();

  if (scheduleSameDateHourExists > 0)
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  if (
    parseInt(scheduleHour.split(":")[0]) <= 7 ||
    parseInt(scheduleHour.split(":")[0]) >= 18
  )
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  if (scheduleDate === 6)
    throw new AppError("Invalid date, work days are monday to friday", 400);

  const newSchedule: Schedule = scheduleRepository.create({
    ...scheduleData,
    realEstate: realEstate!,
    user: user!,
  });
  await scheduleRepository.save(newSchedule);
};

export default createScheduleService;
