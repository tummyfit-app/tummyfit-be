"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const client_1 = require("@prisma/client");
class Database {
    static GetConnection() {
        return new client_1.PrismaClient();
    }
}
exports.Database = Database;
