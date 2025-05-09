import express from 'express';
import * as UserController from '../controllers/user.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';
import { registerUserValidation, updateUserValidation } from '../middleware/validations/user.validation.js';
import { csrfProtection } from '../middleware/csrf.middleware.js';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, UserController.getAllUsers);
router.get('/:id', verifyToken, UserController.getUserById);
router.post('/register', verifyToken, verifyAdmin, csrfProtection, registerUserValidation, UserController.createUser);
router.put('/:id', verifyToken, csrfProtection, updateUserValidation, UserController.updateUser);
router.delete('/:id', verifyToken, verifyAdmin, csrfProtection, UserController.deleteUser);
router.patch('/consent', verifyToken, csrfProtection, UserController.updateUserConsent);
router.get('/export', verifyToken, csrfProtection, UserController.exportUserData); // exporta los datos del usuario autenticado
router.delete('/me', verifyToken, csrfProtection, UserController.deleteAccount);