const app = require("../app");
const request = require("supertest");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
require("../models");

let token;
let id;

beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@test.com",
    password: "123456789",
  });
  token = res.body.token;
});

test("GET /cart DEBE TRAER TODOS LOS CARRITOS", async () => {
  const res = await request(app)
    .get("/cart")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /cart DEBE CREAR UN CARRITO", async () => {
  const product = await Product.create({
    title: "Samsung galaxy s22",
    description: "Un buen celular",
    brand: "Samsung",
    price: "$500",
  });
  const cart = {
    productId: product.id,
    quantity: 8,
  };
  const res = await request(app)
    .post("/cart")
    .send(cart)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  await product.destroy();
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.quantity).toBe(cart.quantity);
});

test("POST /cart DEBE ACTUALIZAR UN CARRITO", async () => {
  const updatedCart = {
    quantity: 10,
  };
  const res = await request(app)
    .put(`/cart/${id}`)
    .send(updatedCart)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(updatedCart.quantity);
});

test("DELETE /cart DEBE ELIMINAR UN CARRITO", async () => {
  const res = await request(app)
    .delete(`/cart/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
