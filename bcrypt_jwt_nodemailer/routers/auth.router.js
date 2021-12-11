const router = require('express').Router();

const { usersMiddleware, authMiddleware } = require('../middlewares');
const { usersValidator } = require('../validators');
const { authController } = require('../controllers');

router.post(
  '/',
  usersMiddleware.validateUser( usersValidator.validateUserBody ),
  usersMiddleware.getUserByDynamicParams( 'name' ),
  usersMiddleware.ifUserNotExist,
  authMiddleware.ifPasswordNotValid,
  authMiddleware.generateTokenPair,
  authController.loginUser
); // user login

router.delete(
  '/',
  authMiddleware.ifTokenNotExist,
  authMiddleware.verifyToken(),
  authMiddleware.ifTokenNotFromDB(),
  authController.logoutUser
); // user logout

router.put(
  '/refresh',
  usersMiddleware.getUserByDynamicParams( 'name' ),
  usersMiddleware.ifUserNotExist,
  authMiddleware.ifTokenNotExist,
  authMiddleware.verifyToken('refresh'),
  authMiddleware.ifTokenNotFromDB('refresh'),
  authController.refreshToken
); // update access and refresh tokens

module.exports = router;
