export interface AuthEntity {
  id: string;
  username?: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
