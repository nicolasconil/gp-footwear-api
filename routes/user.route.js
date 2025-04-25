import express from 'express';
import * as UserController from '../controllers/user.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';
import { registerUserValidation, updateUserValidation } from '../middleware/validations/user.validation.js';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, UserController.getAllUsers);
router.get('/:id', verifyToken, UserController.getUserById);
router.post('/', verifyToken, verifyAdmin, registerUserValidation, UserController.createUser);
router.put('/:id', verifyToken, updateUserValidation, UserController.updateUser);
router.delete('/:id', verifyToken, verifyAdmin, UserController.deleteUser);