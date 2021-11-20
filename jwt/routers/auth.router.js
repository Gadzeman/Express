const router = require('express').Router();
const { authController } = require('../controllers');
const { usersMiddleware, authMiddleware } = require('../middlewares');

router.post(
  '/',
  usersMiddleware.getUserByDynamicParams('email'),
  usersMiddleware.ifUserNotPresent,
  authController.loginUser
);
router.post(
  '/logout',
  authMiddleware.validateToken(),
  authController.logoutUser
);
router.post(
  '/refresh',
  authMiddleware.validateToken('refresh'),
  authController.refresh
);

module.exports = router;
