import { Request, Response } from 'express';
import User from '../models/User';
import Order from '../models/Order';

export const deleteOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).send({
                success: false,
                message: "Order not found",
                error: {
                    statusCode: 404,
                    details: ["Order not found"],
                }
            });
        }
        res.status(200).send({
            success: true,
            message: 'Order is deleted successfully',
            data: {
                statusCode: 200,
                deletedOrder
            }
        });
    } catch (err) {
        console.error('Server is error during deletion:', err);
        res.status(500).send({
            success: false,
            message: 'Server is error during deletion',
            error: {
                statusCode: 500,
                details: ['Server is error during deletion'],
            }
        })
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
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
            success: false,
            message: 'Server error during deletion',
            error: {
                statusCode: 500,
                details: ['Server error during deletion'],
            }
        })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, { passwordHash: 0 });
        res.status(200).send({
            success: true,
            message: 'Get user successfully',
            data: {
                statusCode: 200,
                data: users
            }
        });
    } catch (err) {
        console.error('Server error during deletion:', err);
        res.status(500).send({
            success: false,
            message: 'Server error during deletion',
            error: {
                statusCode: 500,
                details: ['Server error during deletion'],
            }
        })
    }
}