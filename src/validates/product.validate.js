import Joi from "joi";

const productStoreSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  stock: Joi.number().integer().required(),
  image: Joi.string()
    .pattern(new RegExp(/\.(jpeg|jpg|gif|png)$/))
    .required(),
  category: Joi.string().required(),
});

const productUpdateStockSchema = Joi.object({
  amount: Joi.number().integer().required(),
});

export { productStoreSchema, productUpdateStockSchema };
