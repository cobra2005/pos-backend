import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Extend express-session type to include 'token'
declare module 'express-session' {
    interface SessionData {
        accessToken?: string;
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        const { username, password } = data;
        
        const findUser = await User.findOne({ username });
        if(!findUser) return res.status(404).send({
            success: false,
            message: 'User not found',
            error: {
                statusCode: 404,
                details: ['User not found'],
            }
        })
        const isMatched = await comparePassword(password, findUser.passwordHash);
        if(!isMatched) return res.status(401).send({
            success: false,
            message: 'Password is incorrect',
            error: {
                statusCode: 401,
                details: ['Password is incorrect'],
            }
        })
        const { passwordHash, ...userResponse } = findUser.toObject();
        const payload = {
            id: userResponse._id,
            role: userResponse.role,
            username: userResponse.username,
            email: userResponse.email
        };
        const jwtSecret = process.env.JWT_SECRET || 'jwt-secret';
        const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: 60000 * 60 });
        req.session.accessToken = accessToken;
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            data: {
                statusCode: 200,
                data: userResponse,
            }
        });

    } catch (err) {
        console.error(`Login failure: ${err}`);
        return res.status(500).send({
            success: false,
            message: 'Login failure',
            error: {
                statusCode: 500,
                details: ['Login failure'],
            }
        })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        const { username, email, password, role } = data;

        // Check existing user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if(existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists',
                error: {
                    statusCode: 400,
                    details: ['User already exists']
                }
            })
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password,
            passwordHash: await hashPassword(password),
            role: role || 'user'
        });

        const savedUser = await newUser.save();

        // Remove sensitive data before sending response
        const { passwordHash, ...userData } = savedUser.toObject();

        res.status(201).send({
            success: true,
            message: 'Register successful',
            data: {
                statusCode: 201,
                user: userData
            }
        });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).send({
            success: false,
            message: 'Register failed',
            error: {
                statusCode: 500,
                details: ['Register failed'],
            }
        })
    }
}