import express from "express";
import * as MPController from "../controllers/mercadoPago.controller.js";
import * as PaymentController from '../controllers/payment.controller.js';
import { verifyToken } from "../middleware/auth.middleware.js";
import { csrfProtection } from "../middleware/csrf.middleware.js";
import { createPreferenceValidation } from "../middleware/validations/payment.validation.js";
import { manualPaymentValidation } from "../middleware/validations/manualPayment.validation.js";

const router = express.Router();

router.post('/mercadopago', verifyToken, csrfProtection, createPreferenceValidation, MPController.createPreference);
router.post('/manual', verifyToken, csrfProtection, manualPaymentValidation, PaymentController.registerManualPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), MPController.webhookNotification);   
router.post('/manual/webhook', express.raw({ type: 'application/json' }), PaymentController.webhook);

export default router;