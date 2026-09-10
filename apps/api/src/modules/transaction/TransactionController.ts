import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { BlockchainProvider } from './providers/BlockchainProvider.js';
import { TransactionNormalizer } from './normalizer/TransactionNormalizer.js';
import { AssetMovementDetector } from './detector/AssetMovementDetector.js';
import { AIStoryGenerator } from './generator/AIStoryGenerator.js';
import { mainnet, bsc, base } from 'viem/chains';

const hashSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid transaction hash format');

export class TransactionController {
  private detector: AssetMovementDetector;
  private storyGenerator: AIStoryGenerator;

  constructor() {
    this.detector = new AssetMovementDetector();
    this.storyGenerator = new AIStoryGenerator();
  }

  getAnalyzedTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hash } = req.params;

      const validation = hashSchema.safeParse(hash);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: validation.error.errors[0]?.message || 'Invalid hash',
        });
      }

      const txHash = validation.data as `0x${string}`;

      // Support ETH, BSC, BASE
      const providers = [
        new BlockchainProvider(base, process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
        new BlockchainProvider(mainnet, process.env.ETH_RPC_URL || 'https://eth.llamarpc.com'),
        new BlockchainProvider(bsc, process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org/')
      ];

      let normalizedTx = null;

      for (const provider of providers) {
        const normalizer = new TransactionNormalizer(provider);
        const tx = await normalizer.normalizeTransaction(txHash);
        if (tx) {
          normalizedTx = tx;
          break; // Found on this chain!
        }
      }

      if (!normalizedTx) {
        return res.status(404).json({
          success: false,
          error: 'Transaction not found on supported networks (Base, ETH, BSC)',
        });
      }

      // Detect movements
      const movements = this.detector.detectMovements(normalizedTx);

      // Generate Story
      const story = await this.storyGenerator.generateStory(normalizedTx, movements);

      return res.status(200).json({
        success: true,
        data: {
          transaction: normalizedTx,
          movements,
          story,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
