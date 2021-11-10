import connection from "../database.js";
import {
  productStoreSchema,
  productUpdateStockSchema,
} from "../validates/product.validate.js";

async function storeProduct(req, res) {
  const { name, price, description, stock, image, category } = req.body;

  const validate = productStoreSchema.validate({
    name,
    price,
    description,
    stock,
    image,
    category,
  });

  if (validate.error) {
    return res.sendStatus(400);
  }

  try {
    const resul_category = await connection.query(
      `SELECT id FROM categories WHERE name = $1`,
      [category]
    );

    if (resul_category.rowCount === 0) {
      return res.sendStatus(404);
    }

    const resul = await connection.query(
      `INSERT INTO games (name, price, description, stock, image) VALUES($1, $2, $3 ,$4 ,$5)`,
      [name, price, description, stock, image]
    );

    const resul_game = await connection.query(`SELECT MAX(id) FROM games`);
    const id_game = resul_game.rows[0].max;
    const id_category = resul_category?.rows[0].id;

    await connection.query(
      `INSERT INTO games_categories (game_id, category_id) VALUES($1, $2)`,
      [id_game, id_category]
    );

    return res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function listAllProducts(req, res) {
  try {
    const { rows } = await connection.query(`SELECT * FROM games`);
    res.status(200).send({ data: rows });
  } catch (err) {
    res.sendStatus(500);
  }
}

async function updateStockProduct(req, res) {
  const { id } = req.params;
  const { amount } = req.body;

  const validate = productUpdateStockSchema.validate({ amount });
  if (validate.error) {
    return res.sendStatus(400);
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
