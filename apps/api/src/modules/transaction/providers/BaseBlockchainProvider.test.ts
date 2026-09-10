import { describe, it, expect, beforeAll } from 'vitest';
import { BaseBlockchainProvider } from './BaseBlockchainProvider.js';

describe('BaseBlockchainProvider', () => {
  let provider: BaseBlockchainProvider;

  beforeAll(() => {
    // Using a public base RPC for tests
    provider = new BaseBlockchainProvider('https://mainnet.base.org');
  });

  it('should fetch the current block number', async () => {
    const blockNumber = await provider.getBlockNumber();
    expect(blockNumber).toBeGreaterThan(0n);
  });

  it('should fetch a known block', async () => {
    const block = await provider.getBlock(10000000n);
    expect(block).not.toBeNull();
    expect(block?.number).toBe(10000000n);
  });

  it('should fetch a known transaction', async () => {
    // Fetch a known block
    const block = await provider.getBlock(10000000n);
    const txHash = block?.transactions[0] as `0x${string}`;
    
    expect(txHash).toBeDefined();

    const tx = await provider.getTransaction(txHash);
    expect(tx).not.toBeNull();
    expect(tx?.hash).toBe(txHash);
  });

  it('should fetch a known transaction receipt', async () => {
    // Fetch a known block
    const block = await provider.getBlock(10000000n);
    const txHash = block?.transactions[0] as `0x${string}`;
    
    expect(txHash).toBeDefined();

    const receipt = await provider.getTransactionReceipt(txHash);
    expect(receipt).not.toBeNull();
    expect(receipt?.transactionHash).toBe(txHash);
    expect(receipt?.status).toBe('success');
  });
});
