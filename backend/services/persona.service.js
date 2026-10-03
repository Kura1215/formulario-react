const personaModel = require('../models/persona.model');

exports.getAll = (cb) => personaModel.getAll(cb);
exports.getById = (id, cb) => personaModel.getById(id, cb);
exports.create = (persona, cb) => personaModel.create(persona, cb);
exports.update = (id, persona, cb) => personaModel.update(id, persona, cb);
exports.delete = (id, cb) => personaModel.delete(id, cb);
