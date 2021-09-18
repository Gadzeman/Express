const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_CONNECT_URL } = require('./config/variables');
const app = express();

mongoose.connect(DB_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log('Port:', PORT);
});
