import Joi from "joi";
const productSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
});

export default productSchema;
