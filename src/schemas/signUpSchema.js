import joi from "joi";

const signUpSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().required(),
  cpf: joi.string().regex("[0-9]{11}").required(),
  phone: joi.string().regex("[0-9]{8,}").required(),
  password: joi
    .string()
    .regex("^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$")
    .required(),
});

export { signUpSchema };
