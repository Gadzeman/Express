const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/error.handler');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require('../config/variables');

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '10m' });

    const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '30d' });

    return {
      access_token,
      refresh_token
    };
  },
  verifyToken: (token, tokenType) => {
    try {
      const secretKey = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

      return jwt.verify(token, secretKey);
    } catch (e) {
      throw new ErrorHandler(401, 'Token invalid');
    }
  }
};
