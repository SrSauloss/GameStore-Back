import connection from "../database.js";
import { transactionStoreSchema } from "../validates/transaction.validate.js";

async function storeTransaction(req, res) {
  const { price, games_ids, date } = req.body;
  const validate = transactionStoreSchema.validate({
    price,
    games_ids,
    date,
  });

  if (validate.error) {
    return res.sendStatus(400);
  }

  try {
    const resu = await connection.query(
      `INSERT INTO transactions (date, total_price, client_id) VALUES($1, $2, $3) RETURNING id`,
      [date, price, req.userId]
    );

    const id_transaction = resu.rows[0].id;
    games_ids.forEach(async (element) => {
      await connection.query(
        `INSERT INTO transaction_games (game_id, transaction_id) VALUES($1, $2)`,
        [element, id_transaction]
      );
    });

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { storeTransaction };
