import express from 'express';
import * as OrderController from '../controllers/order.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';
import { createOrderValidation, dispatchOrderValidation, orderIdParamValidation } from '../middleware/validations/order.validation.js';
import { csrfProtection } from '../middleware/csrf.middleware.js';
import { guestOrderLimiter } from '../middleware/ratelimit.middleware.js';

const router = express.Router();

router.post('/', guestOrderLimiter, csrfProtection, createOrderValidation, OrderController.createOrder);
router.get('/', verifyToken, verifyAdmin, OrderController.getAllOrders);
router.get('/my-orders', verifyToken, OrderController.getMyOrders);
router.get('/:id', verifyToken, orderIdParamValidation, OrderController.getOrderById);
router.patch('/:id/status', verifyToken, verifyAdmin, csrfProtection, orderIdParamValidation, OrderController.updateOrderStatus);
router.patch('/:id/cancel', verifyToken, csrfProtection, orderIdParamValidation, OrderController.cancelMyOrder);
router.patch('/:id/dispatch', verifyToken, verifyAdmin, csrfProtection, orderIdParamValidation, dispatchOrderValidation, OrderController.dispatchOrder);
router.delete('/:id', verifyToken, csrfProtection, orderIdParamValidation, OrderController.deleteOrder);

export default router;