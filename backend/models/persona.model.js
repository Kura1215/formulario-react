const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Persona = sequelize.define('Persona', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  documento: { type: DataTypes.STRING },
  numeroDocumento: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  ciudad: { type: DataTypes.STRING },
  birthday: { type: DataTypes.DATEONLY },
  correo: { type: DataTypes.STRING },
  celular: { type: DataTypes.STRING }
}, {
  tableName: 'personas',
  timestamps: false
});

module.exports = Persona;
