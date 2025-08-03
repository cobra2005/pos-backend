import { body } from 'express-validator';

export const importStockValidation = [
    body('productId')
        .notEmpty().withMessage('productId must not be empty')
        .isString().withMessage('productId must be a string'),
    body('quantity')
        .notEmpty().withMessage('quantity must not be empty')
        .isInt({ min: 1 })
        .withMessage('quantity must be an integer greater than 0')
]

export const exportStockValidation = [
    body('productId')
        .notEmpty().withMessage('productId must not be empty')
        .isString().withMessage('productId must be a string'),
    body('quantity')
        .notEmpty().withMessage('quantity must not be empty')
        .isInt({ min: 1 })
        .withMessage('quantity must be an integer greater than 0')
]