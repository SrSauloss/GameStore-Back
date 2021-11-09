import faker from "faker";
import jwt from "jsonwebtoken";

function createCategoy() {
  const name = faker.lorem.word();
  return name;
}

function createToken() {
  const id = faker.datatype.number();

  const token = jwt.sign({ payload: id }, process.env.JWT_SECRET);
  return token;
}

export { createCategoy, createToken };
