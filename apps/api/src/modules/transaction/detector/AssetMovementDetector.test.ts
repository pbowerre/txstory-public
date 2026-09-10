import { describe, it, expect } from 'vitest';
import { AssetMovementDetector } from './AssetMovementDetector.js';
import type { NormalizedTransaction, AssetMovement } from '@txstory/shared';
import { encodeEventTopics, encodeAbiParameters, parseAbiItem } from 'viem';

describe('AssetMovementDetector', () => {
  const detector = new AssetMovementDetector();

  const mockTxBase: NormalizedTransaction = {
    hash: '0x123',
    blockNumber: 100n,
    from: '0xsender',
    to: '0xreceiver',
    value: 0n,
    input: '0x',
    gasUsed: 21000n,
    effectiveGasPrice: 10n,
    status: 'success',
    timestamp: 1000n,
    logs: [],
  };

  it('should detect NATIVE asset movement', () => {
    const tx = { ...mockTxBase, value: 500n };
    const movements = detector.detectMovements(tx);

    expect(movements).toHaveLength(1);
    expect(movements[0]).toEqual({
      type: 'NATIVE',
      from: '0xsender',
      to: '0xreceiver',
      amount: 500n,
      contractAddress: '0x0000000000000000000000000000000000000000',
    });
  });

  it('should ignore NATIVE asset movement if transaction reverted', () => {
    const tx: NormalizedTransaction = { ...mockTxBase, value: 500n, status: 'reverted' };
    const movements = detector.detectMovements(tx);
    expect(movements).toHaveLength(0);
  });

  it('should detect ERC20 asset movement from logs', () => {
    const fromAddr = '0x1111111111111111111111111111111111111111';
    const toAddr = '0x2222222222222222222222222222222222222222';
    const amount = 1000n;
    const contract = '0xtoken';

    const abiItem = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');
    const topics = encodeEventTopics({
      abi: [abiItem],
      eventName: 'Transfer',
      args: { from: fromAddr, to: toAddr }
    });
    const data = encodeAbiParameters([{ type: 'uint256' }], [amount]);

    const tx: NormalizedTransaction = {
      ...mockTxBase,
      logs: [
        {
          address: contract,
          topics: topics as string[],
          data,
        }
      ]
    };

    const movements = detector.detectMovements(tx);
    expect(movements).toHaveLength(1);
    expect(movements[0]).toEqual({
      type: 'ERC20',
      from: fromAddr,
      to: toAddr,
      amount: amount,
      contractAddress: contract,
    });
  });

  it('should detect ERC721 asset movement from logs', () => {
    const fromAddr = '0x1111111111111111111111111111111111111111';
    const toAddr = '0x2222222222222222222222222222222222222222';
    const tokenId = 99n;
    const contract = '0xnft';

    const abiItem = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)');
    const topics = encodeEventTopics({
      abi: [abiItem],
      eventName: 'Transfer',
      args: { from: fromAddr, to: toAddr, tokenId }
    });

    const tx: NormalizedTransaction = {
      ...mockTxBase,
      logs: [
        {
          address: contract,
          topics: topics as string[],
          data: '0x',
        }
      ]
    };

    const movements = detector.detectMovements(tx);
    expect(movements).toHaveLength(1);
    expect(movements[0]).toEqual({
      type: 'ERC721',
      from: fromAddr,
      to: toAddr,
      tokenId,
      contractAddress: contract,
    });
  });

  it('should ignore token movements if transaction reverted', () => {
    const fromAddr = '0x1111111111111111111111111111111111111111';
    const toAddr = '0x2222222222222222222222222222222222222222';
    const amount = 1000n;
    const contract = '0xtoken';

    const abiItem = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');
    const topics = encodeEventTopics({
      abi: [abiItem],
      eventName: 'Transfer',
      args: { from: fromAddr, to: toAddr }
    });
    const data = encodeAbiParameters([{ type: 'uint256' }], [amount]);

    const tx: NormalizedTransaction = {
      ...mockTxBase,
      status: 'reverted',
      logs: [
        {
          address: contract,
          topics: topics as string[],
          data,
        }
      ]
    };

    const movements = detector.detectMovements(tx);
    expect(movements).toHaveLength(0);
  });
});
