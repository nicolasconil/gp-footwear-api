import { body } from "express-validator";
import { handleValidationErrors } from "./handleErrors.validation.js";

export const newsletterValidation = [
    body('emailList')
        .isArray({ min: 1 })
        .withMessage('La lista de correos electrónicos es obligatoria y debe contener al menos un correo'),
    body('emailList.*')
        .isEmail()
        .withMessage('Cada correo electrónico debe ser válido'),
    body('subject')
        .isString()
        .withMessage('El asunto es obligatorio y debe ser un texto'),
    body('content')
        .isString()
        .withMessage('El contenido es obligatorio y debe ser un texto'),
    handleValidationErrors
];