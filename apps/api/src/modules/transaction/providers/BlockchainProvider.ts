import { createPublicClient, http } from 'viem';
import type { PublicClient, Transaction, TransactionReceipt, Block, Chain } from 'viem';
import type { IBlockchainProvider } from './IBlockchainProvider.js';

export class BlockchainProvider implements IBlockchainProvider {
  private client: PublicClient;

  constructor(chain: Chain, rpcUrl: string) {
    this.client = createPublicClient({
      chain,
      transport: http(rpcUrl),
    }) as unknown as PublicClient;
  }

  async getTransaction(hash: `0x${string}`): Promise<Transaction | null> {
    try {
      return await this.client.getTransaction({ hash });
    } catch (error) {
      return null;
    }
  }

  async getTransactionReceipt(hash: `0x${string}`): Promise<TransactionReceipt | null> {
    try {
      return await this.client.getTransactionReceipt({ hash });
    } catch (error) {
      return null;
    }
  }

  async getBlock(blockNumber: bigint): Promise<Block | null> {
    try {
      return await this.client.getBlock({ blockNumber });
    } catch (error) {
      return null;
    }
  }

  async getBlockNumber(): Promise<bigint> {
    return await this.client.getBlockNumber();
  }
}
