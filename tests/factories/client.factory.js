import faker from "faker-br";
import bcrypt from "bcrypt";
import connection from "../../src/database";

const generateClientBody = (user) => {
  return {
    email: user?.email || faker.internet.email(),
    name: user?.name || faker.name.findName(),
    cpf: user?.cpf || faker.br.cpf(),
    phone: user?.phone || faker.phone.phoneNumber("#########"),
    password: user?.password || "12a!3456",
  };
};

const createClient = async () => {
  const user = generateClientBody();
  const passwordHash = bcrypt.hashSync(user.password, 10);

  const insertedUser = await connection.query(
    `
        INSERT INTO clients 
        (email, name, cpf, phone, password) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
        `,
    [user.email, user.name, user.cpf, user.phone, passwordHash]
  );

  user.id = insertedUser.rows[0].id;

  return user;
};

export { generateClientBody, createClient };
