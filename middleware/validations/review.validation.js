import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleErrors.validation.js';

export const reviewValidation = [
    body('rating')
        .isInt({ min: 1, max: 5 }).withMessage('La calificación debe estar entre 1 y 5'),
    body('comment')
        .optional()
        .trim().withMessage('El comnetario no puede estar vacío')
        .isLength({ max: 500 }).withMessage('El comentario no debe superar los 500 caracteres'),
    body('product')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isMongoId().withMessage('ID de producto inválido'),
    handleValidationErrors
];

export const reviewIdParamValidation = [
    param('reviewId')
        .isMongoId().withMessage('ID de review inválido'),
    handleValidationErrors
];