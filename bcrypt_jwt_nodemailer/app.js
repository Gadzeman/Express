require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { usersRouter, authRouter } = require('./routers');
const { PORT, DB_CONNECT_URL } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('*', _error); // eslint-disable-line

_startServer(); // eslint-disable-line

function _error(err, req, res, next) { // eslint-disable-line
  res
    .status(err.status)
    .json({
      status: err.status || 418,
      message: err.message || 'Something went wrong'
    });
}

async function _startServer() {
  try {
    await app.listen(PORT, () => {
      console.log(`Server connected on port: ${ PORT }`);
    });
    await mongoose.connect( DB_CONNECT_URL )
      .then(() => {
        console.log('Database successfully connected');
      })
      .catch(() => {
        console.error('Database connection failed!!!');
      });
  } catch (e) {
    console.error('Server connection failed!!!');
  }
}
