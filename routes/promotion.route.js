import express from 'express';
import * as PromotionController from '../controllers/promotion.controller.js';

const router = express.Router();

router.post('/send', PromotionController.sendPromotions);

export default router;