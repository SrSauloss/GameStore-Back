import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app.js";
import connection from "../src/database.js";
import { createTransaction } from "./factories/transaction.factory.js";
import { createProduct } from "./factories/product.factory.js";
import { createToken, insertCategory } from "./factories/category.factory.js";
import { createClient } from "./factories/client.factory.js";

afterAll(async () => {
  await connection.query(`DELETE FROM clients`);
  await connection.query(`DELETE FROM transaction_games`);
  await connection.query(`DELETE FROM transactions`);
  await connection.query(`DELETE FROM games_categories`);
  await connection.query(`DELETE FROM games`);
  await connection.query(`DELETE FROM categories`);
});

describe("POST /product/transaction/new", () => {
  it("return 401 for user not authorized", async () => {
    const category = await insertCategory();
    const product = createProduct(category);

    const user = await createClient();
    const body = { email: user.email, password: user.password };

    const client = await supertest(app).post("/sign-in").send(body);
    const token = client.body.token;

    await supertest(app)
      .post("/product/new")
      .send(product)
      .set("Authorization", `Bearer ${token}`);
    const transaction = await createTransaction();

    const resul = await supertest(app)
      .post("/product/transaction/new")
      .send(transaction);
    expect(resul.status).toEqual(401);
  });

  it("return 400 for bad params", async () => {
    const category = await insertCategory();
    const product = createProduct(category);

    const user = await createClient();
    const body = { email: user.email, password: user.password };

    const client = await supertest(app).post("/sign-in").send(body);
    const token = client.body.token;

    await supertest(app)
      .post("/product/new")
      .send(product)
      .set("Authorization", `Bearer ${token}`);
    const transaction = await createTransaction();
    transaction.date = null;

    const resul = await supertest(app)
      .post("/product/transaction/new")
      .send(transaction)
      .set("Authorization", `Bearer ${token}`);

    expect(resul.status).toEqual(400);
  });

  it("return 201 for good params", async () => {
    const category = await insertCategory();
    const product = createProduct(category);
    const user = await createClient();
    const body = { email: user.email, password: user.password };

    const client = await supertest(app).post("/sign-in").send(body);
    const token = client.body.token;

    await supertest(app)
      .post("/product/new")
      .send(product)
      .set("Authorization", `Bearer ${token}`);
    const transaction = await createTransaction();

    const resul = await supertest(app)
      .post("/product/transaction/new")
      .send(transaction)
      .set("Authorization", `Bearer ${token}`);
    expect(resul.status).toEqual(201);
  });
});
