import { AuthEntity } from "./AuthEntity";

interface UserEntity {
  id?: string;
  birthDate: string | Date;
  height: number;
  weight: number;
  sex: string;
  gluten_free: string;
  dairy_free: string;
  vegan: string;
  vegetarian: string;
  alcohol: string;
  daily_activity: string;
  purpose: string;
  userId: string;
  user?: AuthEntity;
}
export default UserEntity;
