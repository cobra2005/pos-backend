import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { loginValidation, registerValidation } from '../validations/authValidations';
import { createProductValidation, updateProductValidation } from '../validations/productValidations';
import { createOrderValidation } from '../validations/orderValidations';
import { importStockValidation, exportStockValidation } from '../validations/stockValidations';

const validate = (schemas: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for(const schema of schemas) {
            await schema.run(req);
        }
        const result = validationResult(req);
        if(!result.isEmpty()) {
            return res.status(400).send({
                success: false,
                message: 'Validation error',
                error: {
                    statusCode: 400,
                    details: ['Validation error', ...result.array()]
                }
            })
        }
        next();
    }
}

export const loginValidate = validate(loginValidation);
export const registerValidate = validate(registerValidation);

// Product validations
export const createProductValidate = validate(createProductValidation);
export const updateProductValidate = validate(updateProductValidation);

// Order validations
export const createOrderValidate = validate(createOrderValidation);

// Stock validations
export const importStockValidate = validate(importStockValidation);
export const exportStockValidate = validate(exportStockValidation);