import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'cashier';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document<any> {
    name: string;
    sku: string;
    price: number;
    stock: number;
    unit: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  items: IOrderItem[];
  total: number;
  createdBy: string;
  createdAt: Date;
}

export interface IStockHistory extends Document {
  productId: string,
  type: 'import' | 'export',
  quantity: number,
  createdAt: Date
}