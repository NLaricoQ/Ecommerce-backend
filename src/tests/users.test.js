const request = require("supertest");
const app = require("../app");
require("../models");
require("../models/index");
let id;
let token;

test("POST /users debe crear un user", async () => {
  const user = {
    firstName: "Victor",
    lastName: "Larico",
    password: "123456789",
    email: "victor1234567@gmail.com",
    phone: "+51 98521354",
  };

  const res = await request(app).post("/users").send(user);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(user.firstName);
});
test("POST /users/login debe generar token", async () => {
  const body = {
    email: "victor1234567@gmail.com",
    password: "123456789",
  };
  const res = await request(app).post("/users/login").send(body);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});
test("GET /users debe traer a todos los users", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
test("PUT /users/:id debe actualizar un usuario", async () => {
  const updatedUser = {
    firstName: "Adrian",
    lastName: "Larico",
    phone: "+51 95126457",
  };
  const res = await request(app)
    .put(`/users/${id}`)
    .send(updatedUser)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedUser.firstName);
});

test("DELETE /users/:id debe eliminar un usuario", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
