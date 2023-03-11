const express = require("express");
const { sequelize } = require("./sequelize");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(require("./routing/authentication"));
app.use(require("./routing/todo"));

app.listen(4005, () => {
  console.log("Server is up on port 4005");
  sequelize.sync({ alter: true });
});
