const { USER, OAuth } = require('../config/db.tables.enum');
const { Schema, model } = require('mongoose');

const oauthSchema = new Schema({
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
}, { timestamps: true });

module.exports = model(OAuth, oauthSchema);
