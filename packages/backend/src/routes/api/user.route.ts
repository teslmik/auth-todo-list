import { Router } from 'express';
import { tryCatchMiddleware } from '../../middleware/middlewares';
import userController from '../../controllers/user.controller';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post('/register', tryCatchMiddleware(userController.register.bind(userController)));

export default router;
