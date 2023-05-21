import joi, { ObjectSchema } from "joi";
import AuthDTO from "../interfaces/AuthDTO";
import { Login } from "../interfaces/LoginDTO";

//schema for register.
export const authSchema: ObjectSchema<AuthDTO> = joi.object().keys({
  username: joi.string().required().min(5),
  password: joi.string().required().min(5),
  email: joi.string().email().required(),
  namauser: joi.string().required(),
});

export const loginSchema: ObjectSchema<Login> = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
});

//harus dilanjutkan
export const descSchema = joi.object().keys({
  age: joi.number().integer().required(),
  height: joi.number().integer().required(),
  weight: joi.number().integer().required(),
  sex: joi.string().required().valid("male", "female"),
  gluten_free: joi.string().required().valid("yes", "no"),
  dairy_free: joi.string().required().valid("yes", "no"),
  vegan: joi.string().required().valid("yes", "no"),
  vegetarian: joi.string().required().valid("yes", "no"),
  alcohol: joi.string().required().valid("yes", "no"),
  daily_activity: joi.string().required(),
  purpose: joi.string().required().valid("diet", "healthy"),
});
