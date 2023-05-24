import { AuthEntity } from "../../entities/AuthEntity";
import AuthDTO from "../../interfaces/AuthDTO";

export interface IAuth {
  findOne(username: string): Promise<AuthEntity | null>;
  insertOne(body: AuthDTO | undefined): Promise<AuthEntity | string>;
  update(id: string, body: AuthDTO): Promise<AuthEntity>;
}
