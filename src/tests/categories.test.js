const request = require("supertest");
const app = require("../app");
require("../models");
require("../models/index");
let token;
let id;
beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@test.com",
    password: "123456789",
  });
  token = res.body.token;
});

test("GET /categories debe traer las categorias", async () => {
  const res = await request(app).get("/categories");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /categories debe crear una categoria", async () => {
  const createCategory = {
    name: "Tech",
  };
  const res = await request(app)
    .post("/categories")
    .send(createCategory)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(createCategory.name);
  expect(res.body.id).toBeDefined();
});
test("PUT /categories/:id debe actualizar una categoria", async () => {
  const updateCategory = {
    name: "Updated Tech",
  };
  const res = await request(app)
    .put(`/categories/${id}`)
    .send(updateCategory)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateCategory.name);
});
test("DELETE /categories/:id debe eliminar una categoria", async () => {
  const res = await request(app)
    .delete(`/categories/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
