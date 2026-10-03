const db = require('../config/db');

exports.getAll = (callback) => {
  db.query('SELECT * FROM personas', callback);
};

exports.getById = (id, callback) => {
  db.query('SELECT * FROM personas WHERE id = ?', [id], callback);
};

exports.create = (persona, callback) => {
  db.query(
    'INSERT INTO personas (documento, numeroDocumento, name, lastName, address, ciudad, birthday, correo, celular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      persona.documento,
      persona.numeroDocumento,
      persona.name,
      persona.lastName,
      persona.address,
      persona.ciudad,
      persona.birthday,
      persona.correo,
      persona.celular
    ],
    callback
  );
};

exports.update = (id, persona, callback) => {
  db.query(
    'UPDATE personas SET documento=?, numeroDocumento=?, name=?, lastName=?, address=?, ciudad=?, birthday=?, correo=?, celular=? WHERE id=?',
    [
      persona.documento,
      persona.numeroDocumento,
      persona.name,
      persona.lastName,
      persona.address,
      persona.ciudad,
      persona.birthday,
      persona.correo,
      persona.celular,
      id
    ],
    callback
  );
};

exports.delete = (id, callback) => {
  db.query('DELETE FROM personas WHERE id=?', [id], callback);
};
