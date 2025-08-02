import mongoose from 'mongoose';
import { IOrder } from '../types';

const orderSchema = new mongoose.Schema<IOrder>({
    items: [
        {
            productId: { type: String, ref: 'Product', required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    createdBy: { type: String, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now() }
});

export default mongoose.model<IOrder>('Order', orderSchema);