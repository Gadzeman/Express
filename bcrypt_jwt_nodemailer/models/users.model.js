const { Schema, model } = require('mongoose');

const usersRoles = require('../config/users.roles');
const { USER } = require('../config/db.collections.enum');

const usersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(usersRoles),
    default: usersRoles.USER
  }
});

module.exports = model(USER, usersSchema);
