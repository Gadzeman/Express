module.exports = {
  PORT: process.env.PORT || 5000,
  DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/node-js-2',

  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'S_1',
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'S_2',

  AUTHORIZATION: 'Authorization'
};
