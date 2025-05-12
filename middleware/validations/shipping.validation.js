import { body, param } from "express-validator";
import { handleValidationErrors } from "./handleErrors.validation.js";

export const shippingValidation = [ // validación para crear o actualizar el envío
    body('orderId')
        .notEmpty().withMessage('El ID de la orden es obligatorio')
        .isMongoId().withMessage('El ID de la orden debe ser un ObjectId válido'),
    body('address')
        .notEmpty().withMessage('La dirección del envío es obligatoria'),
    body('city')
        .notEmpty().withMessage('La ciudad es obligatoria'),
    body('province')
        .notEmpty().withMessage('La provincia es obligatoria'),
    body('postalCode')
        .notEmpty().withMessage('El código postal es obligatorio'),
    body('country')
        .notEmpty().withMessage('El país es obligatorio'),
    handleValidationErrors
];

export const shippingStatusValidation = [
    body('status')
        .notEmpty().withMessage('El estado es obligatorio')
        .isIn(['pendiente', 'procesando', 'enviado', 'entregado']).withMessage('Estado no válido'),
    handleValidationErrors
];

export const orderIdParamValidation = [
    param('orderId')
        .notEmpty().withMessage('El parámetro orderId es obligatorio')
        .isMongoId().withMessage('El parámetro orderId debe ser un ObjectId válido'),
    handleValidationErrors
];