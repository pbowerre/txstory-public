import { describe, it, expect, vi } from 'vitest';
import { TransactionNormalizer } from './TransactionNormalizer.js';
import type { IBlockchainProvider } from '../providers/IBlockchainProvider.js';
import type { Transaction, TransactionReceipt, Block } from 'viem';

describe('TransactionNormalizer', () => {
  it('should normalize a valid transaction successfully', async () => {
    const mockHash = '0x123' as `0x${string}`;
    const mockTx = {
      hash: mockHash,
      blockNumber: 100n,
      from: '0xabc',
      to: '0xdef',
      value: 1000n,
      input: '0x',
    } as unknown as Transaction;
    
    const mockReceipt = {
      gasUsed: 21000n,
      effectiveGasPrice: 20n,
      status: 'success',
      logs: [
        {
          address: '0xcontract',
          topics: ['0xtopic1', '0xtopic2'],
          data: '0xdata',
        }
      ]
    } as unknown as TransactionReceipt;

    const mockBlock = {
      timestamp: 1234567890n,
    } as Block;

    const mockProvider: IBlockchainProvider = {
      getTransaction: vi.fn().mockResolvedValue(mockTx),
      getTransactionReceipt: vi.fn().mockResolvedValue(mockReceipt),
      getBlock: vi.fn().mockResolvedValue(mockBlock),
      getBlockNumber: vi.fn().mockResolvedValue(100n),
    };

    const normalizer = new TransactionNormalizer(mockProvider);
    const result = await normalizer.normalizeTransaction(mockHash);

    expect(mockProvider.getTransaction).toHaveBeenCalledWith(mockHash);
    expect(mockProvider.getTransactionReceipt).toHaveBeenCalledWith(mockHash);
    expect(mockProvider.getBlock).toHaveBeenCalledWith(100n);
    
    expect(result).toEqual({
      hash: mockHash,
      blockNumber: 100n,
      from: '0xabc',
      to: '0xdef',
      value: 1000n,
      input: '0x',
      gasUsed: 21000n,
      effectiveGasPrice: 20n,
      status: 'success',
      timestamp: 1234567890n,
      logs: [
        {
          address: '0xcontract',
          topics: ['0xtopic1', '0xtopic2'],
          data: '0xdata',
        }
      ]
    });
  });

  it('should return null if transaction is not found', async () => {
    const mockProvider: IBlockchainProvider = {
      getTransaction: vi.fn().mockResolvedValue(null),
      getTransactionReceipt: vi.fn().mockResolvedValue(null),
      getBlock: vi.fn().mockResolvedValue(null),
      getBlockNumber: vi.fn().mockResolvedValue(100n),
    };

    const normalizer = new TransactionNormalizer(mockProvider);
    const result = await normalizer.normalizeTransaction('0x123' as `0x${string}`);

    expect(result).toBeNull();
  });
});
