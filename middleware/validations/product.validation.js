import { body } from "express-validator";
import { handleValidationErrors } from "./handleErrors.validation.js";

const genders = ['hombre', 'mujer', 'niños', 'unisex'];

export const createProductValidation = [
    body('name')
        .notEmpty()
        .withMessage('El nombre del producto es obligatorio'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0'),
    body('gender')
        .isIn(genders)
        .withMessage(`El género debe ser uno de: ${genders.join(', ')}`),
    body('variations')
        .isArray({ min: 1 })
        .withMessage('Debe incluir al menos una variación'),
    body('variations.*.size')
        .isNumeric()
        .withMessage('Cada variación debe especificar un tamaño numérico'),
    body('variations.*.color')
        .notEmpty()
        .withMessage('Cada variación debe especificar un color'),,
    body('variations.*.stock')
        .isInt({ min: 0 })
        .withMessage('El stock de cada variación debe ser un entero mayor o igual a 0'),
    body('variations.*.stockMinimo')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El stock mínimo de cada variación debe ser un entero mayor o igual a 0'),   
    handleValidationErrors
];

export const updateProductValidation = [
    body('name')
        .optional()
        .notEmpty()
        .withMessage('El nombre no puede estar vacío'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0'),
    body('gender')
        .optional()
        .isIn(genders)
        .withMessage(`El género debe ser uno de: ${genders.join(', ')}`),
    body('variations')
        .optional()
        .isArray()
        .withMessage('Las variaciones deben ser un arreglo'),
    body('variations.*.size')
        .optional()
        .isNumeric()
        .withMessage('Cada variación debe especificar un tamaño numérico'),
    body('variations.*.color')
        .optional()
        .notEmpty()
        .withMessage('Cada variación debe especificar un color'),
    body('variations.*.stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El stock de cada variación debe ser un entero mayor o igual a 0'),
    body('variations.*.stockMinimo')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El stock mínimo de cada variación debe ser un entero mayor o igual a 0'),
    handleValidationErrors
];