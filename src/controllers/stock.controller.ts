import { Request, Response } from 'express';
import stockService from '../services/stock.service';
import StockHistory from '../models/StockHistory';

export const importStock = async (req: Request, res: Response) => {
    try {
        const newStock = await stockService.importStock(req, res);
        res.status(200).send({
            success: true,
            message: 'Stock is imported successfully',
            data: {
                statusCode: 200,
                data: newStock,
            }
        })
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
        const newStock = await stockService.exportStock(req, res);
        res.status(200).send({
            success: true,
            message: 'Stock is exported successfully',
            data: {
                statusCode: 200,
                data: newStock,
            }
        })
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

export const getStockHistory = async (req: Request, res: Response) => {
    try {
        const { productId, type, from, to, page = 1, limit = 10 } = req.query;
        const query: any = {};
        if (productId) query.productId = productId;
        if (type) query.type = type;
        if (from || to) query.createdAt = {};
        if (from) query.createdAt.$gte = new Date(from as string);
        if (to) query.createdAt.$lte = new Date(to as string);

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        const [data, total] = await Promise.all([
            StockHistory.find(query)
                .sort({ createdAt: -1 })
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber),
            StockHistory.countDocuments(query)
        ]);

        return res.status(200).json({
            data,
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber,
                pages: Math.ceil(total / limitNumber)
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'get stock history failure',
            error: {
                statusCode: 500,
                details: ['get stock history failure']
            }
        });
    }
}