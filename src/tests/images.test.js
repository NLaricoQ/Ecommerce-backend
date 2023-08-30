const app = require("../app");
const request = require("supertest");
require("../models");

let token;

beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@test.com",
    password: "123456789",
  });
  token = res.body.token;
});
test("GET /images debe traer todas las imagenes", async () => {
  const res = await request(app)
    .get("/images")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
