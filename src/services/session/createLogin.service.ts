import { Repository } from "typeorm";
import { TLoginRequest } from "../../interfaces/login/login.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors/errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const createLoginService = async (
  loginData: TLoginRequest
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch: boolean = await compare(
    loginData.password,
    user.password
  );

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return token;
};

export default createLoginService;
