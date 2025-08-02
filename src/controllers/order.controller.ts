import { Request, Response } from 'express';
import orderService from '../services/order.service';
import Order from '../models/Order';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder = await orderService.createOrder(req, res);
        res.status(201).send({
            success: true,
            message: 'Create order successful',
            data: {
                statusCode: 201,
                data: newOrder
            }
        });
    } catch (err) {
        console.error(`Create order failure: ${err}`);
        res.status(500).send({
            success: false,
            message: 'Create order failure',
            error: {
                statusCode: 500,
                details: ['Create order failure']
            }
        })
    }
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({});
        res.status(200).send({
            success: true,
            message: 'Get orders successful',
            data: {
                statusCode: 201,
                data: orders,
            }
        })
    } catch (err) {
        console.error(`Get orders failure: ${err}`);
        res.status(500).send({
            success: false,
            message: 'Get orders failure',
            error: {
                statusCode: 500,
                details: ['Get orders failure']
            }
        })
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order not found',
                error: {
                    statusCode: 404,
                    details: ['Order not found']
                }
            })
        }
        res.status(200).send({
            success: true,
            message: 'Get orders successful',
            data: {
                statusCode: 201,
                data: order,
            }
        })
    } catch (err) {
        console.error(`Get order by id failure: ${err}`);
        res.status(500).send({
            success: false,
            message: 'Get order by id failure',
            error: {
                statusCode: 500,
                details: ['Get order by id failure']
            }
        })
    }
}