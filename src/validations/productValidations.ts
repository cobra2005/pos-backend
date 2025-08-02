import { body } from 'express-validator';

export const createProductValidation = [
    body('name')
        .notEmpty().withMessage('name must not be empty!')
        .isString().withMessage('name must be a string!'),
    body('description')
        .optional(),
    body('price')
        .notEmpty().withMessage('price must not be empty!')
        .isNumeric().withMessage('price must be a number!'),
    body('stock')
        .notEmpty().withMessage('stock must not be empty!')
        .isInt().withMessage('stock must be an integer!'),
    body('unit')
        .notEmpty().withMessage('unit must not be empty!')
        .isString().withMessage('unit must be a string!')
];

export const updateProductValidation = [
    body('name')
        .optional()
        .isString().withMessage('name must be a string!'),
    body('description')
        .optional(),
    body('price')
        .optional()
        .isNumeric().withMessage('price must be a number!'),
    body('stock')
        .optional()
        .isInt().withMessage('stock must be an integer!'),
    body('unit')
        .optional()
        .isString().withMessage('unit must be a string!')
]