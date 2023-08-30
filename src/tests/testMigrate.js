const sequelize = require("../utils/connection");
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
require("../models");

const main = async () => {
  try {
    // Acciones a ejecutar antes de los tests
    sequelize.sync();
    const user = {
      firstName: "test",
      lastName: "user",
      email: "testuser@test.com",
      password: "123456789",
      phone: "+51321594",
    };
    const userFound = await User.findOne({ where: { email: user.email } });
    if (!userFound) {
      await request(app).post("/users").send(user);
    }

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
