import mongoose from 'mongoose';
import { IStockHistory } from '../types';

// export interface IStockHistory extends Document {
//   productId: string,
//   type: 'import' | 'export',
//   quantity: number,
//   createdAt: Date 
// }

const stockHistorySchema = new mongoose.Schema<IStockHistory>({
    productId: { type: String, ref: 'Product', required: true },
    type: { type: String, enum: ['import', 'export'], required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() }
})

export default mongoose.model<IStockHistory>('StockHistory', stockHistorySchema);