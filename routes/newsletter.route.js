import express from 'express';
import * as PromotionController from '../controllers/promotion.controller.js';
import { newsletterValidation } from '../middleware/validations/newsletter.validation.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { csrfProtection } from '../middleware/csrf.middleware.js';

const router = express.Router();

router.post('/', verifyToken, csrfProtection, newsletterValidation, PromotionController.sendPromotions);

export default router;

