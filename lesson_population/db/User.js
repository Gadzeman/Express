const { Schema, model } = require('mongoose');
const { USER } = require('../config/db.tables.enum');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, { timestamps: true });

module.exports = model(USER, userSchema);
