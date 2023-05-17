import joi, { ObjectSchema } from "joi";
import AuthDTO from "../interfaces/AuthDTO";

const authSchema: ObjectSchema<AuthDTO> = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
});

export default authSchema;
