import joi from "joi";
import moment from "moment";
import JoiDate from "@hapi/joi-date";
const Joi = joi.extend(JoiDate);

const transactionStoreSchema = Joi.object({
  price: Joi.number().required(),
  games_ids: Joi.array().required(),
  date: Joi.date()
    .format("YYYY-MM-DD")
    .max("now")
    .min(moment().format("YYYY-MM-DD"))
    .required(),
});

export { transactionStoreSchema };
