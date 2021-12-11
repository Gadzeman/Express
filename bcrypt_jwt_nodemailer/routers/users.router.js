const router = require('express').Router();

const { usersMiddleware, authMiddleware } = require('../middlewares');
const { usersValidator } = require('../validators');
const { usersController } = require('../controllers');

router.get(
  '/',
  authMiddleware.ifTokenNotExist,
  authMiddleware.verifyToken(),
  authMiddleware.ifTokenNotFromDB(),
  usersMiddleware.getUsersWithoutParams,
  usersController.getUsers
); // get all users if user authed;

router.post(
  '/',
  usersMiddleware.validateUser( usersValidator.validateUserBody ),
  usersMiddleware.getUserByDynamicParams( 'name' ),
  usersMiddleware.ifUserExist,
  usersMiddleware.hashUserPassword,
  usersController.postUser
); // user registration;

router.delete(
  '/:user_id'
); // only admin can delete user;

module.exports = router;
