import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { IOrderItem } from '../types';
import Product from '../models/Product';
import Order from '../models/Order';
import User from '../models/User';

const createOrder = async (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        const { items, createdBy } = data;
        if (items.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No items provided',
                error: {
                    statusCode: 400,
                    details: ['No items provided']
                }
            });
        }

        const findUser = await User.findById(createdBy);
        if (!findUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
                error: {
                    statusCode: 404,
                    details: ['User not found']
                }
            });
        }

        // Get productId in items to find product in database
        const productIds = items.map((item: IOrderItem) => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== items.length) {
            return res.status(404).send({
                success: false,
                message: 'Some products not found',
                error: {
                    statusCode: 404,
                    details: ['Some products not found']
                }
            });
        }

        let totalPrice = 0;
        const orderItems = [];

        for (const item of items) {
            const product = products.find(p => p._id.toString() === item.productId);
            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: `Product not found: ${item.productId}`,
                    error: {
                        statusCode: 404,
                        details: [`Product not found: ${item.productId}`]
                    }
                });
            }
            if (product.stock < item.quantity) {
                return res.status(403).send({
                    success: false,
                    message: `Product "${product.name}" is out of stock (${product.stock} remaining)`,
                    error: {
                        statusCode: 403,
                        details: [`Product "${product.name}" is out of stock (${product.stock} remaining)`]
                    }
                });
                // throw new Error(`Product "${product.name}" is out of stock (${product.stock} remaining)`);
            }
            const itemTotal = product.price * item.quantity;
            totalPrice += itemTotal;

            // Push data for order
            orderItems.push({
                productId: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price
            });

            // Update inventory
            product.stock -= item.quantity;
            await product.save();
        }

        // Create new order
        const newOrder = await Order.create({
            items: orderItems,
            total: totalPrice,
            createdBy
        });

        return newOrder;

    } catch (err) {
        console.error('Create order failure:', err);
        res.status(500).send({
            success: false,
            message: 'Create order failure',
            error: {
                statusCode: 500,
                details: ['Create order failure'],
            }
        })
    }
}

export default { createOrder }