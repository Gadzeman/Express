const { Schema, model } = require('mongoose');
const { POST, USER } = require('../config/db.tables.enum');

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER,
    required: true
  }
}, { timestamps: true });

module.exports = model(POST, postSchema);

