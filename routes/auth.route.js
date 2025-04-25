import express from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import { registerValidation, loginValidation, resetPasswordValidation } from '../middleware/validations/auth.validation.js';

const router = express.Router();

router.post('/register', registerValidation, AuthController.registerUser);
router.post('/login', loginValidation, AuthController.authenticateUser);
router.get('/verify-email/:token', AuthController.verifyEmail);
router.post('/request-password-reset', resetPasswordValidation, AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);

export default router;