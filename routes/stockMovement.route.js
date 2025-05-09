import express from 'express';
import * as StockMovementController from '../controllers/stockMovement.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';
import { stockMovementValidation } from '../middleware/validations/stockMovement.validation.js';
import { csrfProtection } from '../middleware/csrf.middleware.js';

const router = express.Router();

router.post('/movement', verifyToken, verifyAdmin, csrfProtection, stockMovementValidation, StockMovementController.recordStockMovement);

export default router;