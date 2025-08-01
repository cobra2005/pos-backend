import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    unit: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

export default mongoose.model('Product', productSchema);