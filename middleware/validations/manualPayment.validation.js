import { body } from "express-validator";
import { handleValidationErrors } from "./handleErrors.validation.js";

export const manualPaymentValidation = [
    body('orderId')
        .isMongoId()
        .withMessage('El ID de la orden es inválido'),
    body('method')
        .isIn(['transferencia', 'rapipago', 'pagofacil', 'banco'])
        .withMessage('Método de pago inválido'),
    body('paymentProof')
        .optional()
        .isString()
        .withMessage('El comprobante debe ser un texto válido'),
    handleValidationErrors
];