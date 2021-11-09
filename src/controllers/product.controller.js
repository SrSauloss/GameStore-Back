import connection from "../database.js";
import {
  productStoreSchema,
  productUpdateStockSchema,
} from "../validates/product.validate.js";

async function storeProduct(req, res) {
  const { name, price, description, stock, image } = req.body;

  const validate = productStoreSchema.validate({
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

async function listAllProducts(req, res) {
  try {
    const { rows } = await connection.query(`SELECT * FROM games`);
    res.status(200).send(rows);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function updateStockProduct(req, res) {
  const { id } = req.params;
  const { amount } = req.body;

  const validate = productUpdateStockSchema.validate({ amount });
  if (validate.error) {
    res.status(400).send(validate.error);
  }

  try {
    const { rowCount } = await connection.query(
      `UPDATE games SET stock = (SELECT stock FROM games WHERE id = $1) - $2 WHERE id = $1`,
      [id, amount]
    );

    if (rowCount === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { storeProduct, listAllProducts, updateStockProduct };
