import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.status(200).send({
            success: true,
            message: 'Get products successful',
            data: {
                statusCode: 200,
                data: products
            }
        })
    } catch (err) {
        console.error(`Get products failure: ${err}`);
        return res.status(500).send({
            success: false,
            message: 'Get products failure',
            error: {
                statusCode: 500,
                details: ['Get products failure']
            }
        })
    }
}