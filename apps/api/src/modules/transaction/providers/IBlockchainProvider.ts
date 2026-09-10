import type { Transaction, TransactionReceipt, Block, Log } from 'viem';

export interface IBlockchainProvider {
  /**
   * Fetch a transaction by its hash.
   */
  getTransaction(hash: `0x${string}`): Promise<Transaction | null>;

  /**
   * Fetch a transaction receipt by its hash.
   */
  getTransactionReceipt(hash: `0x${string}`): Promise<TransactionReceipt | null>;

  /**
   * Fetch a block by its number.
   */
  getBlock(blockNumber: bigint): Promise<Block | null>;

  /**
   * Fetch the current block number.
   */
  getBlockNumber(): Promise<bigint>;
}
