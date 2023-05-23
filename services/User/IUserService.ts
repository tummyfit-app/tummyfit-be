import { User } from "@prisma/client";
import UserEntity from "../../entities/UserEntity";

interface IUserService {
  findUser(id: string): Promise<UserEntity | null>;
  insertUser(payload: UserEntity, userId: string): Promise<UserEntity | string>;
}

export default IUserService;
