import { AuthEntity } from "../../entities/AuthEntity";

export interface IAuth {
  findAll(): Promise<AuthEntity[]>;
}
