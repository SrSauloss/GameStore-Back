import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app.js";
import { createCategoy, createToken } from "./factories/category.factory.js";

describe("POST /product/category/new", () => {
  it("return 401 for user not authorized", async () => {
    const body = { name: createCategoy() };

    const resul = await supertest(app).post("/product/category/new").send(body);
    expect(resul.status).toEqual(401);
  });

  it("return 400 for bad params", async () => {
    const body = { name: "" };
    const token = createToken();

    const resul = await supertest(app)
      .post("/product/category/new")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(resul.status).toEqual(400);
  });

  it("return 201 for good params", async () => {
    const body = { name: createCategoy() };
    const token = createToken();

    const resul = await supertest(app)
      .post("/product/category/new")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(resul.status).toEqual(201);
  });
});

describe("GET /product/categories", () => {
  it("return 401 for user not authorized", async () => {
    const resul = await supertest(app).get("/product/categories");
    expect(resul.status).toEqual(401);
  });

  it("return 200 for user authorized", async () => {
    const token = createToken();

    const resul = await supertest(app)
      .get("/product/categories")
      .set("Authorization", `Bearer ${token}`);
    expect(resul.status).toEqual(200);
  });
});
