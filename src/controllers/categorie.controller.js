import connection from "../database.js";
import { categorieStoreSchema } from "../validates/categorie.validate.js";

async function storeCategorie(req, res) {
  const { name } = req.body;

  const validate = categorieStoreSchema.validate({
    name,
  });

  if (validate.error) {
    return res.sendStatus(400);
  }

  try {
    const resul = await connection.query(
      `INSERT INTO categories (name) VALUES($1)`,
      [name]
    );

    return res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function listAllCategories(req, res) {
  try {
    const { rows } = await connection.query(`SELECT * FROM categories`);
    res.send(rows);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { storeCategorie, listAllCategories };
