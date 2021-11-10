import faker from "faker";
import connection from "../../src/database.js";
import "../../src/setup.js";

function createProduct(category) {
  const product = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    stock: faker.datatype.number(),
    image: faker.image.imageUrl(),
    category: category || faker.random.word(),
  };
  product.image += ".png";
  return product;
}

async function createDataUpdate() {
  const { rows } = await connection.query("SELECT MAX(id) FROM games");
  const amount = faker.datatype.number();

  return { id: rows[0].max, amount };
}

export { createProduct, createDataUpdate };
