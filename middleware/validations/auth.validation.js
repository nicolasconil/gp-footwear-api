import { body } from "express-validator";
import { handleValidationErrors } from "./handleErrors.validation.js";

export const registerValidation = [
    body('email')
        .isEmail()
        .withMessage('Debe ser un email válido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    handleValidationErrors
];

export const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Email inválido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    handleValidationErrors
];

export const resetPasswordValidation = [
    body('email')
        .isEmail()
        .withMessage('Email inválido')
]