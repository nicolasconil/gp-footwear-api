import { query } from "express-validator";
import { handleValidationErrors } from "./handleErrors.validation,js";

export const exportFormatValidation = [
    query('format')
        .optional()
        .isIn(['json', 'csv', 'pdf'])
        .withMessage('El formato debe ser json, csv o pdf'),
    handleValidationErrors
];