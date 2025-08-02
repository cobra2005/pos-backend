import { body } from 'express-validator';
import mongoose from 'mongoose';
import User from '../models/User';

export const createOrderValidation = [
    body('createdBy')
        .notEmpty().withMessage('user id must not be empty')
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid user ID format'),
    body('items')
        .isArray({ min: 1 }).withMessage('At least one order item is required')
        .custom((items) => {
            if (!items.every((item: any) => item && typeof item === 'object')) {
                throw new Error('Each item must be an object');
            }
            return true;
        }),
    body('items.*.productId')
        .notEmpty().withMessage('productId must not be empty')
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid product ID format'),
    body('items.*.name')
        .notEmpty().withMessage('product name must not be empty')
        .isString().withMessage('product name must be a string')
        .trim(),
    body('items.*.quantity')
        .notEmpty().withMessage('quantity must not be empty')
        .isInt({ min: 1 }).withMessage('quantity must be at least 1'),
    body('items.*.price')
        .notEmpty().withMessage('price must not be empty')
        .isFloat({ min: 0 }).withMessage('price must not be negative'),
]