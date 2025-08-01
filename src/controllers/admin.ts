import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import User from '../models/User';
import { matchedData } from 'express-validator';
import Product from '../models/Product';
import mongoose from 'mongoose';

interface UserJwtPayload {
    role: 'admin' | 'cashier'
    id: string;
    username: string;
    email: string;
}

export const deleteUserById = async (req: Request, res: Response) => {
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
        const { role } = decoded;
        if (role !== 'admin') {
            return res.status(403).send({
                success: false,
                message: 'Only admin can get users',
                error: {
                    statusCode: 403,
                    details: ['Only admin can get users'],
                }
            })
        }

        const users = await User.find({}, { passwordHash: 0 });

        res.status(200).send({
            success: true,
            message: 'User is deleted successfully',
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

export const addProduct = async (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        const { name, sku, price, stock, unit } = data;

        // Kiểm tra trùng SKU trước khi thêm
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
            return res.status(400).send({
                success: false,
                message: 'Product with this SKU already exists',
                error: {
                    statusCode: 400,
                    details: ['SKU must be unique']
                }
            });
        }

        // Tạo sản phẩm mới
        const newProduct = await Product.create({
            name,
            sku,
            price: Number(price),
            stock: Number(stock),
            unit,
            // createdAt và updatedAt sẽ tự động thêm theo schema
        });

        // Trả về response thành công
        return res.status(201).send({
            success: true,
            message: 'Product added successfully',
            data: {
                statusCode: 201,
                data: {
                    id: newProduct._id,
                    name: newProduct.name,
                    sku: newProduct.sku,
                    price: newProduct.price,
                    stock: newProduct.stock,
                    unit: newProduct.unit,
                    createdAt: newProduct.createdAt
                }
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

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = matchedData(req);
        const { name, price, stock, unit } = data;

        // Check valid id
        if(!mongoose.Types.ObjectId.isValid(id)) {
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
                    updatedAt: Date.now()
                }
            },
            { new: true, runValidators: true }
        );

        // Check if the product exists
        if(!updatedProduct) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
                error: {
                    statusCode: 404,
                    details: [`No product found with ID: ${id}`]
                }
            })
        }

        // Return success response
        return res.status(200).send({
            success: true,
            message: 'Product added successfully',
            data: {
                statusCode: 200,
                data: {
                    id: updatedProduct._id,
                    name: updatedProduct.name,
                    sku: updatedProduct.sku,
                    price: updatedProduct.price,
                    stock: updatedProduct.stock,
                    unit: updatedProduct.unit,
                    updatedAt: updatedProduct.updatedAt
                }
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
        const { id } = req.params;
        // Check valid id
        if(!mongoose.Types.ObjectId.isValid(id)) {
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