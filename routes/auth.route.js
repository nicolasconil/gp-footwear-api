import express from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import { registerValidation, loginValidation, resetPasswordValidation } from '../middleware/validations/auth.validation.js';
import { csrfProtection, addCsrfToken } from '../middleware/csrf.middleware.js';
import { loginLimiter, passwordResetLimiter, registerLimiter } from '../middleware/ratelimit.middleware.js';

const router = express.Router();

router.post('/register', registerLimiter, csrfProtection, registerValidation, AuthController.registerUser);
router.post('/login', loginLimiter, csrfProtection, loginValidation, AuthController.authenticateUser);
router.get('/verify-email/:token', AuthController.verifyEmail);
router.post('/request-password-reset', csrfProtection, resetPasswordValidation, AuthController.requestPasswordReset);
router.post('/reset-password', csrfProtection, passwordResetLimiter, AuthController.resetPassword);
router.get('/csrf-token', csrfProtection, addCsrfToken, (req, res) => {
    res.status(200).json({ csrfToken: res.locals.csrfToken });
});

export default router;