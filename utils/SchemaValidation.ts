import joi, { ObjectSchema } from "joi";
import AuthDTO from "../interfaces/AuthDTO";
import { Login } from "../interfaces/LoginDTO";
import joiDate from "@joi/date";
const joy = joi.extend(joiDate);

//schema for register.
export const authSchema: ObjectSchema<AuthDTO> = joi.object().keys({
  username: joi.string().required().min(5),
  password: joi.string().required().min(5),
  email: joi.string().email().required(),
  firstname: joi
    .string()
    .pattern(/^[a-zA-Z ]*$/)
    .required(),
  lastname: joi.string().pattern(/^[a-zA-Z ]*$/),
});

export const loginSchema: ObjectSchema<Login> = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
});

//harus dilanjutkan
export const descSchema = joi.object().keys({
  birthDate: joi.date().iso().required().raw(),
  height: joi.number().integer().required(),
  weight: joi.number().integer().required(),
  sex: joi.string().required().valid("male", "female"),
  gluten_free: joi.string().required().valid("yes", "no"),
  dairy_free: joi.string().required().valid("yes", "no"),
  vegan: joi.string().required().valid("yes", "no"),
  vegetarian: joi.string().required().valid("yes", "no"),
  alcohol: joi.string().required().valid("yes", "no"),
  daily_activity: joi
    .string()
    .required()
    .valid(
      "Sedentary",
      "Lightly active",
      "Moderately active",
      "Very active",
      "Extra active"
    ),
  purpose: joi.string().required().valid("Maintain weight", "Weight loss"),
});

export const updateUserSchema = joi.object().keys({
  username: joi.string().min(5),
  password: joi.string().min(5),
  email: joi.string().email(),
  firstname: joi
    .string()
    .pattern(/^[a-zA-Z ]*$/)
    .required(),
  lastname: joi.string().pattern(/^[a-zA-Z ]*$/),
});

export const updateDescUserSchema = joi.object().keys({
  birthDate: joi.date().iso().raw(),
  height: joi.number().integer(),
  weight: joi.number().integer(),
  sex: joi.string().valid("male", "female"),
  gluten_free: joi.string().valid("yes", "no"),
  dairy_free: joi.string().valid("yes", "no"),
  vegan: joi.string().valid("yes", "no"),
  vegetarian: joi.string().valid("yes", "no"),
  alcohol: joi.string().valid("yes", "no"),
  daily_activity: joi
    .string()
    .valid(
      "Sedentary",
      "Lightly active",
      "Moderately active",
      "Very active",
      "Extra active"
    ),
  purpose: joi.string().valid("Maintain weight", "Weight loss"),
});
