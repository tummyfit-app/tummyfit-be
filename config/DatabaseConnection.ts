import { PrismaClient } from "@prisma/client";

export class Database {
  static GetConnection() {
    return new PrismaClient();
  }
}
