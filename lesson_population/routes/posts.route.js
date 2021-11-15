const route = require('express').Router();

const { postsController } = require('../controllers');
const { postsMiddleware, usersMiddleware } = require('../middlewares');

route.get(
  '/:user_id',
  usersMiddleware.getUserByDynamicParams('user_id', 'params', '_id'),
  usersMiddleware.ifUserNotPresent,
  postsMiddleware.getPostsByDynamicParams('user_id', 'params', 'user'),
  postsController.getPosts
);
route.post(
  '/',
  postsMiddleware.validatePostBody,
  postsController.createPost
);

module.exports = route;
