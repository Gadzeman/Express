const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_CONNECT_URL } = require('./config/variables');
const { usersRouter, authRouter } = require('./routers');

mongoose.connect(DB_CONNECT_URL);
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('*', _errorHandler); // eslint-disable-line
app.use(_error); // eslint-disable-line

function _errorHandler(err, req, res, next) {
  next({
    status: err.status || 418,
    message: err.message || 'Something went wrong'
  });
}
function _error(err, req, res, next) { // eslint-disable-line
  res
    .status(err.status)
    .json({
      message: err.message
    });
}

app.listen(PORT, () => {
  console.log('Port:', PORT);
});
