import { Request, Response } from 'express';
import Product from "../models/Product";
import productService from '../services/product.service';

export const addProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await productService.createProduct(req, res);
        return res.status(201).send({
            success: true,
            message: 'Product added successfully',
            data: {
                statusCode: 201,
                data: newProduct
            }
        });

    } catch (err) {
        console.error('Add products failure:', err);
        res.status(500).send({
            success: false,
            message: 'Add products failure',
            error: {
                statusCode: 500,
                details: ['Add products failure'],
            }
        })
    }
}

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

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await productService.updateProduct(req, res);
        if(!updatedProduct) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
                error: {
                    statusCode: 404,
                    details: ['Product not found']
                }
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Product added successfully',
            data: {
                statusCode: 200,
                data: updatedProduct
            }
        });

    } catch (err) {
        console.error('Update product failure:', err);
        res.status(500).send({
            success: false,
            message: 'Update product failure',
            error: {
                statusCode: 500,
                details: ['Update product failure'],
            }
        })
    }
}

export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await productService.deleteProductById(req, res);
        if(!deletedProduct) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
                error: {
                    statusCode: 404,
                    details: ['Product not found']
                }
            })
        }
        res.status(200).send({
            success: true,
            message: 'Product is deleted successfully',
            data: {
                statusCode: 200,
                data: deletedProduct
            }
        })

    } catch (err) {
        console.error('Delete product failure:', err);
        res.status(500).send({
            success: false,
            message: 'Delete product failure',
            error: {
                statusCode: 500,
                details: ['Delete product failure'],
            }
        })
    }
}
