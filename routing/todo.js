const jwt = require('jsonwebtoken');
const express = require('express');
const { User, Todo } = require('../sequelize');

const router = express.Router();

const checkJwt = (req, res, next) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, 'sourcemind', (err, decoded) => {
    if (err) res.sendStatus(401);
    else {
      req.userId = decoded.id;
      next();
    }
  });
};

router.get('/todos', checkJwt, (req, res) => {
  Todo.findAll({ where: { userId: req.userId } }).then((todos) => {
    res.json(todos);
  });
});

router.post('/todos', checkJwt, (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const done = req.body.done;

  if (!title) res.sendStatus(400);

  Todo.create({ title, description, done, userId: req.userId }).then((todo) => {
    res.status(201).json(todo);
  });
});

router.patch('/todos/:id', checkJwt, (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const done = req.body.done;

  if (!title) res.sendStatus(400);

  Todo.findOne({ where: { id, userId: req.userId } }).then((todo) => {
    if (!todo) res.sendStatus(404);
    else {
      todo.title = title;
      todo.description = description;
      todo.done = done;
      todo.save().then((todo) => {
        res.json(todo);
      });
    }
  });
});

router.delete('/todos/:id', checkJwt, (req, res) => {
  const id = req.params.id;

  Todo.findOne({ where: { id, userId: req.userId } }).then((todo) => {
    if (!todo) res.sendStatus(404);
    else {
      todo.destroy().then(() => {
        res.sendStatus(204);
      });
    }
  });
});

module.exports = router;
