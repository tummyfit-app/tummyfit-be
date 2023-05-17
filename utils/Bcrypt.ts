import bcrypt from "bcrypt";

function hashPassword(plainPassword: string) {
  const hash: string = bcrypt.hashSync(plainPassword, 10);

  return hash;
}

export default hashPassword;
