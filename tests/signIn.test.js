import "../src/setup.js";
import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database.js";
import {
  createClient,
  generateClientBody,
} from "./factories/client.factory.js";

describe("POST /sign-in", () => {
  afterAll(async () => {
    await connection.query(`
        DELETE FROM clients 
        `);
  });

  it("returns 403 for invalid body", async () => {
    const body = {};

    const result = await supertest(app).post("/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(403);
  });

  it("returns 200 when account is logged in sucessufully", async () => {
    const user = await createClient();
    const body = { email: user.email, password: user.password };

    const result = await supertest(app).post("/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(200);
  });

  it("returns 401 when email or password does not match or exist", async () => {
    const user = generateClientBody();
    const body = { email: user.email, password: user.password };

    const result = await supertest(app).post("/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(401);
  });
});
