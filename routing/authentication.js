const jwt = require("jsonwebtoken");
const express = require("express");
const { User } = require("../sequelize");

const router = express.Router();

router.post("/signup", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) res.sendStatus(400);

  User.findOne({ where: { email } }).then((user) => {
    if (user) res.sendStatus(400);
    else {
      User.create({ name, email, password }).then((user) => {
        res.status(201).json(user);
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) res.sendStatus(400);

  User.findOne({ where: { email } }).then((user) => {
    if (!user) res.sendStatus(400);
    else {
      if (user.password === password) {
        const token = jwt.sign({ id: user.id }, "sourcemind", {
          expiresIn: 86400,
        });

        res.json({ jwt: token });
      } else res.sendStatus(400);
    }
  });
});

module.exports = router;
