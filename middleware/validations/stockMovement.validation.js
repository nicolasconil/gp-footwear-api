import { body } from "express-validator";
import { handleValidationErrors } from "./handleErrors.validation.js";

export const stockMovementValidation = [
    body('productId')
        .isMongoId()
        .withMessage('El campo "productId" deber ser un ID válido'),
    body('size')
        .isNumeric()
        .withMessage('El talle debe ser un número'),
    body('color')
        .notEmpty()
        .withMessage('El color es obligatorio'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser mayor que 0'),
    body('movementType')
        .isInt(['venta', 'ingreso'])
        .withMessage('El tipo de movimiento debe ser "venta" o "ingreso"'),
    handleValidationErrors
];

