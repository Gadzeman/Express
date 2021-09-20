const router = require('express').Router();
const { usersMiddleware } = require('../middlewares');
const { usersController } = require('../controllers');

router.get(
  '/:user_id',
  usersMiddleware.getUserByDynamicParams('user_id', 'params', '_id'),
  usersMiddleware.checkIsAdmin(['admin']),
  usersController.getUser
);
router.post(
  '/',
  usersMiddleware.validateUserBody,
  usersMiddleware.checkUniqueEmail,
  usersController.createUser
);
router.delete(
  '/:user_id',
  usersMiddleware.getUserByDynamicParams('user_id', 'params', '_id'),
  usersMiddleware.checkIsAdmin(['user']),
  usersController.deleteUser
);

module.exports = router;
