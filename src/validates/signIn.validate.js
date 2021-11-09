import joi from "joi";

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$"
      )
    )
    .required(),
});

export { signInSchema };
