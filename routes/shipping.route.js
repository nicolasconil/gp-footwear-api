import express from "express";
import * as ShippingController from '../controllers/shipping.controller.js';
import { verifyToken, verifyAdmin } from "../middleware/auth.middleware.js";
import { csrfProtection } from "../middleware/csrf.middleware.js";
import { orderIdParamValidation, shippingStatusValidation, shippingValidation } from "../middleware/validations/shipping.validation.js";

const router = express.Router();

router.post('/', csrfProtection, shippingValidation, ShippingController.createShipping); // crea el envío (compras anónimas y autenticadas)
router.get('/', verifyToken, verifyAdmin, ShippingController.getAllShippings); // obtiene todos los envíos (administrador)
router.get('/:orderId', verifyToken, orderIdParamValidation, ShippingController.getShippingByOrderId); // obtiene el envío por ID  de orden (usuario registrado)
router.patch('/:orderId/status', verifyToken, verifyAdmin, csrfProtection, orderIdParamValidation, shippingStatusValidation, ShippingController.updateShippingStatus); // actualiza el estado del envío (administrador)
router.patch('/:orderId', verifyToken, verifyAdmin, csrfProtection, orderIdParamValidation, shippingValidation, ShippingController.updateShipping); // actualiza los datos del envío
router.delete('/:orderId', verifyToken, verifyAdmin, csrfProtection, orderIdParamValidation, ShippingController.deleteShipping); // elimina el envío

export default router;