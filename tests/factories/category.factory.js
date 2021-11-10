import faker from "faker";
import jwt from "jsonwebtoken";
import connection from "../../src/database.js";

function createCategoy() {
  const name = faker.lorem.word();
  return name;
}

function createToken() {
  const id = faker.datatype.number();

  const token = jwt.sign({ payload: id }, process.env.JWT_SECRET);
  return token;
}

async function insertCategory() {
  const category = faker.random.word();

  const resul_category = await connection.query(
    `INSERT INTO categories (name) VALUES($1)`,
    [category]
  );

  return category;
}
export { createCategoy, createToken, insertCategory };
