import mongoose from 'mongoose';
import { IProduct } from '../types';

const productSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    unit: { type: String, required: true },
    description: { type: String, default: '', trim: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

export default mongoose.model<IProduct>('Product', productSchema);