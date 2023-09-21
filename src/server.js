const app = require("./app");
const sequelize = require("./utils/connection");
const cors = require("cors");
require("./models");

const PORT = process.env.PORT || 8080;
const whiteList = ["https://ecommerce-react-nelson.netlify.app/"];

app.use(cors({ origin: whiteList }));

const main = async () => {
  try {
    sequelize.sync({ alter: true });
    console.log("DB connected");
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

main();
