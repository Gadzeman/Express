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
  authMiddleware.validateTokenAccess,
  authController.logoutUser
);
router.post(
  '/refresh',
  authMiddleware.validateTokenRefresh,
  authController.refresh
);

module.exports = router;
