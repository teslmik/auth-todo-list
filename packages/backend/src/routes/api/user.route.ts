import { Router } from 'express';
import { tryCatchMiddleware, checkAuth } from '../../middleware';
import userController from '../../controllers/user.controller';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.get('', checkAuth, tryCatchMiddleware(userController.getAllUsers.bind(userController)));
router.get('/:id', tryCatchMiddleware(userController.getOneUserById.bind(userController)));
router.post('/register', tryCatchMiddleware(userController.register.bind(userController)));
router.post('/login', tryCatchMiddleware(userController.login.bind(userController)));

export default router;
