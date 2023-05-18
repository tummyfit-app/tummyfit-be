import joi, { ObjectSchema } from "joi";
import AuthDTO from "../interfaces/AuthDTO";
import { Login } from "../interfaces/LoginDTO";

//schema for register.
export const authSchema: ObjectSchema<AuthDTO> = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
});

export const loginSchema: ObjectSchema<Login> = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
});
