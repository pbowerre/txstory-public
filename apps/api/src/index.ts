import 'dotenv/config';

// Fix for BigInt serialization in JSON
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';

import transactionRoutes from './modules/transaction/transactionRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const logger = pino();
const PORT = process.env.PORT || 8700;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Incoming request');
  next();
});

app.use('/api/v1/transactions', transactionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`🚀 API available at http://localhost:${PORT}/api/v1/`);
});
