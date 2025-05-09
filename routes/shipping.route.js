import express from 'express';
import { calculate } from '../controllers/shipping.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { csrfProtection } from '../middleware/csrf.middleware.js';

const router = express.Router();
router.post('/calculate', verifyToken, csrfProtection, calculate);

export default router;