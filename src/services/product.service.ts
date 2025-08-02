import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import Product from '../models/Product';
import { generateSKU } from '../utils/generate';
import mongoose from 'mongoose';

const createProduct = async (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        const { name, price, stock, unit, description } = data;

        // Create new product and save to database
        const newProduct = await Product.create({
            name,
            sku: generateSKU(name),
            price,
            ...(description && { description }),
            stock,
            unit,
            // createdAt and updatedAt will be automatically added according to schema
        });

        return newProduct;

    } catch (err) {
        console.error('Create product failure:', err);
        res.status(500).send({
            success: false,
            message: 'Create product failure',
            error: {
                statusCode: 500,
                details: ['Create product failure'],
            }
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = matchedData(req);
    const { name, price, stock, unit, description } = data;
    // Check valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            success: false,
            message: 'Invalid product ID',
            error: {
                statusCode: 400,
                details: ['ID must be a valid MongoDB ObjectId']
            }
        })
    }
    // Find and update product
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
            $set: {
                // Only update if have change
                ...(name && { name }),
                ...(price && { price: Number(price) }),
                ...(stock && { stock: Number(stock) }),
                ...(unit && { unit }),
                ...(description && { description }),
                updatedAt: Date.now()
            }
        },
        { new: true, runValidators: true }
    );
    return updatedProduct;
}

const deleteProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            success: false,
            message: 'Invalid product ID',
            error: {
                statusCode: 400,
                details: ['ID must be a valid MongoDB ObjectId']
            }
        })
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    return deletedProduct;
}

export default { createProduct, updateProduct, deleteProductById };