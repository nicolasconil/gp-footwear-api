import express from 'express';
import * as StockMovementController from '../controllers/stockMovement.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';
import { stockMovementValidation } from '../middleware/validations/stockMovement.validation.js';

const router = express.Router();

router.post('/movement', verifyToken, verifyAdmin, stockMovementValidation, StockMovementController.recordStockMovement);

export default router;