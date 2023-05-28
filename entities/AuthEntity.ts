export interface AuthEntity {
  id: string;
  username?: string;
  password: string;
  email: string;
  firstname: string;
  lastname?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
