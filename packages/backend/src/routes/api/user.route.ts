import { Router } from 'express';
import { tryCatchMiddleware, checkAuth, userValidation } from '../../middleware';
import userController from '../../controllers/user.controller';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.get('', checkAuth, tryCatchMiddleware(userController.getAllUsers.bind(userController)));
router.get(
  '/me',
  checkAuth,
  tryCatchMiddleware(userController.getOneUserById.bind(userController))
);
router.get('/activate/:link', tryCatchMiddleware(userController.activateUser.bind(userController)));
router.post(
  '/register',
  userValidation.registerLogin,
  tryCatchMiddleware(userController.register.bind(userController))
);
router.post(
  '/login',
  userValidation.registerLogin,
  tryCatchMiddleware(userController.login.bind(userController))
);
router.put(
  '/edit',
  checkAuth,
  userValidation.update,
  tryCatchMiddleware(userController.editUser.bind(userController))
);
router.put(
  '/recovery',
  userValidation.recovery,
  tryCatchMiddleware(userController.recoveryPassword.bind(userController))
);

export default router;
