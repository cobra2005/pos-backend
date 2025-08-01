import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.session.accessToken;
    if(!accessToken) return res.status(401).send({
        success: false,
        message: 'Unauthorized',
        error: {
            statusCode: 401,
            details: ['accessToken', 'Unauthorized'],
        }
    })
    next();
}

export const isGuest = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.session.accessToken;
    if(accessToken) return res.status(401).send({
        success: false,
        message: 'You are logged in',
        error: {
            statusCode: 401,
            details: ['accessToken', 'You are logged in'],
        }
    })
    next();
}