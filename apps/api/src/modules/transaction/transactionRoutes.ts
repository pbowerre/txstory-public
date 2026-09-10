import { Router } from 'express';
import { TransactionController } from './TransactionController.js';

const router = Router();
const controller = new TransactionController();

// GET /api/v1/transactions/:hash
router.get('/:hash', controller.getAnalyzedTransaction);

export default router;
