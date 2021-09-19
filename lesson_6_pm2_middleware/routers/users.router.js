const router = require('express').Router();
const { usersMiddleware } = require('../middlewares');
const { usersController } = require('../controllers');

router.get(
  '/:user_id',
  usersMiddleware.checkIsAdmin(['admin']),
  usersMiddleware.isUserPresent,
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
  usersMiddleware.checkIsAdmin(['admin']),
  usersMiddleware.isUserPresent,
  usersController.deleteUser
);

module.exports = router;
