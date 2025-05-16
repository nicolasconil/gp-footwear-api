import express from "express";
import * as UserController from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { csrfProtection, addCsrfToken } from '../middleware/csrf.middleware.js';
import { exportFormatValidation } from "../middleware/validations/data.validation.js";

const router = express.Router();

router.get('/', verifyToken, csrfProtection, addCsrfToken, exportFormatValidation, UserController.exportUserData);

export default router;