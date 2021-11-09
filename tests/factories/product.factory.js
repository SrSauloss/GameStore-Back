import faker from "faker";
import jwt from "jsonwebtoken";
import "../../src/setup.js";

function createProduct() {
  const product = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    stock: faker.datatype.number(),
    image: faker.image.imageUrl(),
  };

  return product;
}

function createToken() {
  const id = faker.datatype.number();

  const token = jwt.sign({ payload: id }, process.env.JWT_SECRET);
  return token;
}

export { createProduct, createToken };
