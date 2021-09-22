const router = require('express').Router();
const { usersMiddleware, authMiddleware } = require('../middlewares');
const { usersController } = require('../controllers');

router.get(
  '/:user_id',
  usersMiddleware.getUserByDynamicParams('user_id', 'params', '_id'),
  usersMiddleware.ifUserNotPresent,
  usersMiddleware.checkIsAdmin(['user']),
  usersController.getUser
);
router.post(
  '/',
  usersMiddleware.validateUserBody,
  usersMiddleware.ifUserPresent,
  usersController.createUser
);
router.delete(
  '/:user_id',
  authMiddleware.validateTokenAccess,
  usersMiddleware.getUserByDynamicParams('user_id', 'params', '_id'),
  usersMiddleware.ifUserNotPresent,
  usersMiddleware.checkIsAdmin(['user']),
  usersController.deleteUser
);

module.exports = router;
