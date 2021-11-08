import connection from "../database.js";
import productSchema from "../validates/product.validate.js";

async function storeProduct(req, res) {
  const { name, price, description, stock, image } = req.body;
  const validate = productSchema.validate({
    name,
    price,
    description,
    stock,
    image,
  });

  if (validate.error) {
    return res.sendStatus(400);
  }

  try {
    const resul = await connection.query(
      `INSERT INTO games (name, price, description, stock, image) VALUES($1, $2, $3 ,$4 ,$5)`,
      [name, price, description, stock, image]
    );

    return res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { storeProduct };
