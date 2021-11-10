import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app.js";
import {
  createDataUpdate,
  createProduct,
} from "./factories/product.factory.js";
import { insertCategory, createToken } from "./factories/category.factory.js";
import connection from "../src/database.js";

afterAll(async () => {
  await connection.query(`DELETE FROM games_categories`);
  await connection.query(`DELETE FROM games`);
  await connection.query(`DELETE FROM categories`);
});

describe("POST /product/new", () => {
  it("return 401 for user not authorized", async () => {
    const product = createProduct();

    const resul = await supertest(app).post("/product/new").send(product);
    expect(resul.status).toEqual(401);
  });

  it("return 400 for bad params", async () => {
    const product = createProduct();
    product.image = "";
    const token = createToken();

    const resul = await supertest(app)
      .post("/product/new")
      .set("Authorization", `Bearer ${token}`)
      .send(product);
    expect(resul.status).toEqual(400);
  });

  it("return 404 for category not found", async () => {
    const product = createProduct();
    const token = createToken();

    const resul = await supertest(app)
      .post("/product/new")
      .set("Authorization", `Bearer ${token}`)
      .send(product);
    expect(resul.status).toEqual(404);
  });

  it("return 201 for good params", async () => {
    const category = await insertCategory();
    const product = createProduct(category);
    const token = createToken();

    const resul = await supertest(app)
      .post("/product/new")
      .send(product)
      .set("Authorization", `Bearer ${token}`);

    expect(resul.status).toEqual(201);
  });
});

describe("GET /product/all", () => {
  it("return 200 for sucess", async () => {
    const resul = await supertest(app).get("/product/all");
    expect(resul.status).toEqual(200);

    expect(resul.body).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
      })
    );
  });
});

describe("PUT /product/:id", () => {
  it("return 401 for user not authorized", async () => {
    const data = await createDataUpdate();

    const resul = await supertest(app)
      .put(`/product/${data.id}`)
      .send({ amount: data.amount });
    expect(resul.status).toEqual(401);
  });

  it("return 400 for bad params", async () => {
    const data = await createDataUpdate();
    const token = createToken();

    const resul = await supertest(app)
      .put(`/product/${data.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: "" });
    expect(resul.status).toEqual(400);
  });

  it("return 404 for game not found", async () => {
    const data = await createDataUpdate();
    data.id += 1;
    const token = createToken();

    const resul = await supertest(app)
      .put(`/product/${data.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: data.amount });
    expect(resul.status).toEqual(404);
  });

  it("return 200 for sucess", async () => {
    const data = await createDataUpdate();
    const token = createToken();

    const resul = await supertest(app)
      .put(`/product/${data.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: data.amount });
    expect(resul.status).toEqual(200);
  });
});
