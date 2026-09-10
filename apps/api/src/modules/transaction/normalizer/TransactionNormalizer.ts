import type { IBlockchainProvider } from '../providers/IBlockchainProvider.js';
import type { NormalizedTransaction } from '@txstory/shared';

export class TransactionNormalizer {
  constructor(private provider: IBlockchainProvider) {}

  /**
   * Normalizes a transaction by fetching its data, receipt, and block timestamp.
   * @param hash The transaction hash to normalize
   * @returns The normalized transaction or null if the transaction is not found
   */
  async normalizeTransaction(hash: `0x${string}`): Promise<NormalizedTransaction | null> {
    const tx = await this.provider.getTransaction(hash);
    if (!tx) return null;

    const receipt = await this.provider.getTransactionReceipt(hash);
    if (!receipt) return null;

    let timestamp = 0n;
    if (tx.blockNumber) {
      const block = await this.provider.getBlock(tx.blockNumber);
      if (block) {
        timestamp = block.timestamp;
      }
    }

    return {
      hash: tx.hash,
      blockNumber: tx.blockNumber || 0n,
      from: tx.from,
      to: tx.to || null,
      value: tx.value,
      input: tx.input,
      gasUsed: receipt.gasUsed,
      effectiveGasPrice: receipt.effectiveGasPrice || 0n,
      status: receipt.status === 'success' ? 'success' : 'reverted',
      timestamp,
      logs: receipt.logs.map(log => ({
        address: log.address,
        topics: [...log.topics],
        data: log.data,
      })),
    };
  }
}
