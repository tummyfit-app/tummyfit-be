import UserEntity from "../../entities/UserEntity";

interface IUserService {
  findUser(id: string): Promise<UserEntity | null>;
  insertUser(payload: UserEntity, userId: string): Promise<UserEntity | string>;
  update(payload: UserEntity, userId: string): Promise<UserEntity | void>;
}

export default IUserService;
