import "../src/setup.js";
import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database.js";
import { generateSignUpBody } from "./factories/client.factory.js";

describe("POST /sign-up", () => {
  afterAll(async () => {
    await connection.query(`
        DELETE FROM clients 
        `);
  });

  it("returns 403 for invalid body", async () => {
    const body = {};

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    expect(status).toEqual(403);
  });

  it("returns 201 when account is created sucessufully", async () => {
    const body = generateSignUpBody({ email: "test@email.com" });

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    expect(status).toEqual(201);
  });

  it("returns 409 when email is already in use", async () => {
    const body = generateSignUpBody({ email: "test@email.com" });

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    expect(status).toEqual(409);
  });
});
