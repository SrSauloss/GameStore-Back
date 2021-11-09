import joi from "joi";

const signUpSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().required(),
  cpf: joi.string().pattern(new RegExp("[0-9]{11}")).required(),
  phone: joi.string().pattern(new RegExp("[0-9]{8,}")).required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$"
      )
    )
    .required(),
});

export { signUpSchema };
