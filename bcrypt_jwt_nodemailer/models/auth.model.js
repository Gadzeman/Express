const { Schema, model } = require('mongoose');

const { OAuth, USER } = require('../config/db.collections.enum');

const authSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER
  }
});

module.exports = model(OAuth, authSchema);
