const { Sequelize } = require('sequelize');

const db = 'assessment';
const user = 'root';
const password = 'root';

const sequelize = new Sequelize(db, user, password, {
  dialect: 'mysql',
});

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  }
);

const Todo = sequelize.define(
  'todo',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    done: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'todos',
  }
);

module.exports = { sequelize, User, Todo };
