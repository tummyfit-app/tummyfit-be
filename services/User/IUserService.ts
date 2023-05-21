import UserEntity from "../../entities/UserEntity";

interface IUserService {
  findUser(id: string): Promise<UserEntity | null>;
}

export default IUserService;
