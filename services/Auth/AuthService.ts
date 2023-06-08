import { PrismaClient } from "@prisma/client";
import { AuthEntity } from "../../entities/AuthEntity";
import { IAuth } from "./IAuthService";

import AuthDTO from "../../interfaces/AuthDTO";
import { hashPassword } from "../../utils/Bcrypt";
import { gcsStorage } from "../../middlewares/StorageUpload";

class AuthService implements IAuth {
  private prisma: PrismaClient;
  constructor(orm: PrismaClient) {
    this.prisma = orm;
  }

  async update(id: string, body: AuthDTO): Promise<AuthEntity> {
    const bucketName = process.env.BUCKET || "tummyfit";
    const bucket = gcsStorage.bucket(bucketName);
    if (body.password !== undefined) {
      body.password = hashPassword(body.password);
    }
    const dataBefore = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (dataBefore) {
      const data = dataBefore.urlprofile.split("/");
      const dataAkhir: string = data[data.length - 1];

      const file = bucket.file(`assets/${dataAkhir}`);
      const [exists] = await file.exists();
      if (exists) {
        await file.delete();
      } else {
        console.log("===================");
      }
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        urlprofile: body.urlprofile || undefined,
        username: body.username || undefined,
        email: body.email || undefined,
        password: body.password || undefined,
        firstname: body.firstname || undefined,
        lastname: body.lastname || undefined,
      },
    });
  }
  async insertOne(body: AuthDTO): Promise<AuthEntity | string> {
    body.password = hashPassword(body.password);
    return this.prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
        firstname: body.firstname,
        lastname: body.lastname,
      },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        firstname: true,
        lastname: true,
      },
    });
  }

  public async findOne(username: string): Promise<AuthEntity | null> {
    return this.prisma.user.findFirst({
      where: {
        username: username,
      },
      select: {
        email: true,
        username: true,
        password: true,
        id: true,
        firstname: true,
        lastname: true,
        urlprofile: true,
      },
    });
  }
}

export default AuthService;
