import faker from "faker-br";

const generateSignUpBody = (user) => {
  return {
    email: user?.email || faker.internet.email(),
    name: user?.name || faker.name.findName(),
    cpf: user?.cpf || faker.br.cpf(),
    phone: user?.phone || faker.phone.phoneNumber("#########"),
    password: user?.password || "12a!3456",
  };
};

export { generateSignUpBody };
