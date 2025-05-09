import express from 'express';
import * as PromotionController from '../controllers/promotion.controller.js';
import { csrfProtection } from '../middleware/csrf.middleware.js';

const router = express.Router();

router.post('/send', csrfProtection, PromotionController.sendPromotions);

export default router;