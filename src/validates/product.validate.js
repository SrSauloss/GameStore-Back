import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  stock: Joi.number().integer().required(),
  image: Joi.string()
    .pattern(new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i))
    .required(),
});

export default productSchema;
