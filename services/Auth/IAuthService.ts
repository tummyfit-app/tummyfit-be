import { AuthEntity } from "../../entities/AuthEntity";
import AuthDTO from "../../interfaces/AuthDTO";

export interface IAuth {
  findAll(): Promise<AuthEntity[]>;
  insertOne(body: AuthDTO | undefined): Promise<AuthEntity>;
}
