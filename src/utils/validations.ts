import { body } from 'express-validator';

export const loginValidation = [
    body('username')
        .notEmpty().withMessage('username must not be empty!')
        .isString().withMessage('username must be a string!'),
    body('password')
        .notEmpty().withMessage('password must not be empty!')
        .isString().withMessage('password must be a string!')
        .isLength({ min: 4, max: 15 }).withMessage('password can only be 4-15 characters!')
];

export const registerValidation = [
    body('username')
        .notEmpty().withMessage('username must not be empty!')
        .isString().withMessage('username must be a string!')
        .isLength({ min: 4, max: 15 }).withMessage('username can only be 4-15 characters!'),
    body('email')
        .notEmpty().withMessage('email must not be empty!')
        .isString().withMessage('email must be a string!')
        .isEmail().withMessage('email must be a email!'),
    body('role')
        .notEmpty().withMessage('role must not be empty!')
        .isString().withMessage('role must be a string!')
        .isIn(['cashier', 'admin']).withMessage('role must be either "cashier" or "admin"!'),
    body('password')
        .notEmpty().withMessage('password must not be empty!')
        .isString().withMessage('password must be a string!')
        .isLength({ min: 4, max: 15 }).withMessage('password can only be 4-15 characters!'),
];

export const createProductValidation = [
    body('name')
        .notEmpty().withMessage('name must not be empty!')
        .isString().withMessage('name must be a string!'),
    body('sku')
        .notEmpty().withMessage('sku must not be empty!')
        .isString().withMessage('sku must be a string!'),
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
        .notEmpty().withMessage('name must not be empty!')
        .isString().withMessage('name must be a string!'),
    body('price')
        .notEmpty().withMessage('price must not be empty!')
        .isNumeric().withMessage('price must be a number!'),
    body('stock')
        .notEmpty().withMessage('stock must not be empty!')
        .isInt().withMessage('stock must be an integer!'),
    body('unit')
        .notEmpty().withMessage('unit must not be empty!')
        .isString().withMessage('unit must be a string!')
]