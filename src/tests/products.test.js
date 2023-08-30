const request = require("supertest");
const app = require("../app");
const Image = require("../models/Image");

require("../models");

let id;
let token;
beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@test.com",
    password: "123456789",
  });
  token = res.body.token;
});

test("GET /products debe traer todos los productos", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /products debe crear un producto", async () => {
  const createProduct = {
    title: "Samsung galaxy s22",
    description: "Un buen celular",
    brand: "Samsung",
    price: "$500",
  };
  const res = await request(app)
    .post("/products")
    .send(createProduct)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.title).toBe(createProduct.title);
});

test("GET /products/:id debe traer a un producto", async () => {
  const res = await request(app)
    .get(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test("PUT /products/:id  debe actualizar un producto", async () => {
  const updatedProduct = {
    title: "Samsung galaxy s22 Ultra",
    description: "Un excelente celular",
    brand: "Samsung",
    price: "$650",
  };
  const res = await request(app)
    .put(`/products/${id}`)
    .send(updatedProduct)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(updatedProduct.title);
});
test("POST /products/:id/images debe crear una relacion", async () => {
  const image = await Image.create({
    url: "loquesea",
    publicId: "losquesea",
  });
  const res = await request(app)
    .post(`/products/${id}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});
test("DELETE /products/:id debe eliminar un producto", async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
