import faker from "faker";
import dayjs from "dayjs";
import connection from "../../src/database.js";
import "../../src/setup.js";
import { createClient } from "./client.factory.js";

async function createTransaction(category) {
  const user = await createClient();
  const { rows } = await connection.query("SELECT MAX(id) FROM games");
  const id_game = rows[0].max;
  const transaction = {
    client_id: user.id,
    price: faker.datatype.float(),
    games_ids: [{ id: id_game, amount: faker.datatype.number() }],
    date: dayjs().format("YYYY-MM-DD"),
  };

  return transaction;
}

export { createTransaction };
