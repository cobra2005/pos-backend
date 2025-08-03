import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import Product from '../models/Product';
import StockHistory from '../models/StockHistory';

export const importStock = async (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        const { productId, quantity } = data;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
                error: {
                    statusCode: 404,
                    details: ['Product not found'],
                }
            })
        }

        product.stock += quantity;
        await product.save();

        const newStock = await StockHistory.create({
            productId,
            type: 'import',
            quantity,
            createdAt: new Date()
        });

        return newStock;

    } catch (err) {
        console.error('import stock failure:', err);
        res.status(500).send({
            success: false,
            message: 'import stock failure',
            error: {
                statusCode: 500,
                details: ['import stock failure'],
            }
        })
    }
}

export const exportStock = async (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        const { productId, quantity } = data;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
                error: {
                    statusCode: 404,
                    details: ['Product not found'],
                }
            })
        }

        if (product.stock < quantity) {
            return res.status(400).send({
                success: false,
                message: 'Not enough stock',
                error: {
                    statusCode: 400,
                    details: ['Not enough stock']
                }
            })
        }

        product.stock -= quantity;
        await product.save();

        const newStock = await StockHistory.create({
            productId,
            type: 'export',
            quantity,
            createdAt: new Date()
        });

        return newStock;

    } catch (err) {
        console.error('export stock failure:', err);
        res.status(500).send({
            success: false,
            message: 'export stock failure',
            error: {
                statusCode: 500,
                details: ['export stock failure'],
            }
        })
    }
}

export default { importStock, exportStock }