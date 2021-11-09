import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app.js";
import { createProduct, createToken } from "./factories/product.factory.js";

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

  it("return 201 for good params", async () => {
    const product = createProduct();
    const token = createToken();

    const resul = await supertest(app)
      .post("/product/new")
      .send(product)
      .set("Authorization", `Bearer ${token}`);

    expect(201).toEqual(201);
  });
});
