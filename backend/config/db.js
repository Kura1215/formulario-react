const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('formulario', 'root', 'tdea2026', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
