import bcrypt from "bcrypt";

export function hashPassword(plainPassword: string): string {
  const hash: string = bcrypt.hashSync(plainPassword, 10);

  return hash;
}

export function comparePassword(plainPassword: string, hash: string): boolean {
  const result: boolean = bcrypt.compareSync(plainPassword, hash);

  return result;
}
