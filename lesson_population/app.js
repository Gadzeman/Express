const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_CONNECT_URL } = require('./config/variables');
const { usersRoute, postsRoute } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRoute);
app.use('/posts', postsRoute);
app.use('*', _error); // eslint-disable-line

start(); // eslint-disable-line

function _error(err, req, res, next) { // eslint-disable-line
  res
    .status(
      err.status
    )
    .json({
      status: err.status || 418,
      message: err.message || 'Something went wrong'
    });
}

async function start() {
  try {
    await mongoose.connect(DB_CONNECT_URL).then(() => {
      console.log('DB connected');
    });

    app.listen(PORT, () => {
      console.log(`Server on PORT: ${PORT}`);
    });
  } catch (e) {
    console.error({
      status: 500,
      message: 'Data base or server doesn\'t work'
    });
  }
}
