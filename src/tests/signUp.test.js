import "../setup.js";
import app from "../app.js";
import supertest from "supertest";
import connection from "../database.js";

describe("POST /sign-up", () => {
  afterAll(async () => {
    await connection.query(`
        DELETE FROM clients 
        `);
  });

  function generateSignUpBody(user) {
    return {
      email: user?.email || "test@email.com",
      name: user?.name || "Test",
      cpf: user?.cpf || "11111111111",
      phone: user?.phone || "11111111",
      password: user?.password || "12a!3456",
    };
  }

  it("returns 403 for invalid body", async () => {
    const body = {};

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    expect(status).toEqual(403);
  });

  it("returns 201 when account is created sucessufully", async () => {
    const body = generateSignUpBody();

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    expect(status).toEqual(201);
  });

  it("returns 409 when email is already in use", async () => {
    const body = generateSignUpBody();

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    expect(status).toEqual(409);
  });
});
