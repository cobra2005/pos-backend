import { Request, Response, NextFunction } from 'express';
import { jwtDecode } from 'jwt-decode';

interface UserJwtPayload {
  role: 'admin' | 'cashier'
  id: string;
  username: string;
  email: string;
}

export const roleAdmin = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.session.accessToken;
    if(!accessToken) return res.status(401).send({
        success: false,
        message: 'Unauthorized',
        error: {
            statusCode: 401,
            details: ['accessToken', 'Unauthorized'],
        }
    })
    const decoded = jwtDecode<UserJwtPayload>(accessToken);
    const { role } = decoded;
    if(role !== 'admin') return res.status(403).send({
        success: true,
        message: 'Forbidden',
        error: {
            statusCode: 403,
            details: ['Forbidden', 'Only admin can access']
        }
    })
    next();
}