import { validationResult, ValidationChain } from 'express-validator';
import { 
    loginValidation, 
    registerValidation,
    createProductValidation,    
    updateProductValidation
} from '../utils/validations';
import { Request, Response, NextFunction } from 'express';

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
export const createProductValidate = validate(createProductValidation);
export const updateProductValidate = validate(updateProductValidation);