import express from 'express';
import { calculate } from '../controllers/shipping.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/calculate', verifyToken, calculate);

export default router;