import pg from "pg";

const { Pool } = pg;

const databaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

const connection = new Pool(databaseConfig);

export default connection;
