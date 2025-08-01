import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import User from '../models/User';

interface UserJwtPayload {
    role: 'admin' | 'cashier'
    id: string;
    username: string;
    email: string;
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const accessToken = req.session.accessToken;
        if (!accessToken) return res.status(401).send({
            success: false,
            message: 'Unauthorized',
            error: {
                statusCode: 401,
                details: ['accessToken', 'Unauthorized'],
            }
        })
        const decoded = jwtDecode<UserJwtPayload>(accessToken);
        const { id: userId, role } = decoded;
        if (userId !== id && role !== 'admin') {
            return res.status(403).send({
                success: false,
                message: 'Only admin can delete any user',
                error: {
                    statusCode: 403,
                    details: ['Only admin can delete any user'],
                }
            })
        }
    
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    statusCode: 404,
                    details: ["User not found"],
                }
            });
        }
    
        res.status(200).send({
            success: true,
            message: 'User is deleted successfully',
            data: {
                statusCode: 200,
                deletedUserId: deletedUser._id
            }
        });
    } catch (err) {
        console.error('Server error during deletion:', err);
        res.status(500).send({
            success: true,
            message: 'Server error during deletion',
            error: {
                statusCode: 500,
                details: ['Server error during deletion'],
            }
        })
    }
}