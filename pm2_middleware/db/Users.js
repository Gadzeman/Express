const { Schema, model } = require('mongoose');
const userRoles = require('../config/user.roles');

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  role: {
    type: String,
    default: userRoles.USER,
    enum: Object.values(userRoles)
  }
}, { timestamps: true });

module.exports = model('User', userSchema);
