import Joi from "joi";
const userSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(30).required(),
  password: Joi.string().alphanum().min(5).max(30).required(),
});

export default userSchema;
