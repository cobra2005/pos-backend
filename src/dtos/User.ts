export interface User {
    id: string;
    username: string;
    role: 'admin' | 'cashier';
    createdAt: Date;
    updatedAt: Date;
}