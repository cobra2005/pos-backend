import { Router } from 'express';
import { importStockValidate } from '../middlewares/validate';
import { importStock, exportStock, getStockHistory } from '../controllers/stock.controller';

const router = Router();

// [GET] /auth/api/stock/history?productId=123&type=import&from=2025-01-01&to=2025-08-03&page=1&limit=10
router.get('/history', getStockHistory);
router.post('/import', importStockValidate, importStock);
router.post('/export', importStockValidate, exportStock);

export default router;