const route = require('express').Router();

const { usersController } = require('../controllers');
const { usersMiddleware } = require('../middlewares');

route.get(
  '/:user_id',
  usersMiddleware.getUserByDynamicParams('user_id', 'params', '_id'),
  usersMiddleware.ifUserNotPresent,
  usersController.getUser
);
route.post(
  '/',
  usersMiddleware.validateUserBody,
  usersMiddleware.getUserByDynamicParams('name'),
  usersMiddleware.ifUserPresent,
  usersController.createUser
);

module.exports = route;
