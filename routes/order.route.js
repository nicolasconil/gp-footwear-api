import express from 'express';
import * as OrderController from '../controllers/order.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';
import { createOrderValidation, orderIdParamValidation } from '../middleware/validations/order.validation.js';

const router = express.Router();

router.post('/', createOrderValidation, OrderController.createOrder);
router.get('/', verifyToken, verifyAdmin, OrderController.getAllOrders);
router.get('/my-orders', verifyToken, OrderController.getMyOrders);
router.get('/:id', verifyToken, orderIdParamValidation, OrderController.getOrderById);
router.patch('/:id/status', verifyToken, verifyAdmin, orderIdParamValidation, OrderController.updateOrderStatus);
router.patch('/:id/cancel', verifyToken, orderIdParamValidation, OrderController.cancelMyOrder);
router.delete('/:id', verifyToken, orderIdParamValidation, OrderController.deleteOrder);

export default router;