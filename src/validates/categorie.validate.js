import Joi from "joi";

const categorieStoreSchema = Joi.object({
  name: Joi.string().required(),
});

export { categorieStoreSchema };
