import { body } from "express-validator";
import { handleValidationErrors } from "./handleErrors.validation.js";

export const createPreferenceValidation = [
    body('products')
        .isArray({ min: 1 })
        .withMessage('Debe enviar al menos un producto'),
    body('products.*.title')
        .isString()
        .withMessage('El título es obligatorio'),
    body('products.*.quantity')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser mayor a 0'),
    body('products.*.price')
        .isNumeric()
        .withMessage('El precio debe ser un valor numérico'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Email inválido'),
    body('orderId')
        .isMongoId()
        .withMessage('El Order ID es obligatorio'),
    handleValidationErrors
];

