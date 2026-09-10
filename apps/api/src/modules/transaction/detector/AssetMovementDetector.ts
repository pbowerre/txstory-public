import { decodeEventLog, parseAbiItem } from 'viem';
import type { NormalizedTransaction, AssetMovement } from '@txstory/shared';

const TRANSFER_EVENT_ERC20 = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');
const TRANSFER_EVENT_ERC721 = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)');
const TRANSFER_SINGLE_ERC1155 = parseAbiItem('event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)');
const TRANSFER_BATCH_ERC1155 = parseAbiItem('event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)');

// The signature for ERC20 and ERC721 Transfer is the same: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
const TRANSFER_SIGNATURE = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const TRANSFER_SINGLE_SIGNATURE = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62';
const TRANSFER_BATCH_SIGNATURE = '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb';

export class AssetMovementDetector {
  /**
   * Analyzes a normalized transaction and extracts all asset movements.
   * @param tx The normalized transaction
   * @returns An array of asset movements detected
   */
  detectMovements(tx: NormalizedTransaction): AssetMovement[] {
    const movements: AssetMovement[] = [];

    // 1. Detect Native Asset Movements (only if successful)
    if (tx.status === 'success' && tx.value > 0n && tx.to) {
      movements.push({
        type: 'NATIVE',
        from: tx.from,
        to: tx.to,
        amount: tx.value,
        contractAddress: '0x0000000000000000000000000000000000000000',
      });
    }

    // If transaction reverted, token transfers in logs are invalid anyway
    if (tx.status !== 'success') {
      return movements;
    }

    // 2. Detect Token Movements from Logs
    for (const log of tx.logs) {
      if (!log.topics || log.topics.length === 0) continue;

      const signature = log.topics[0];

      try {
        if (signature === TRANSFER_SIGNATURE) {
          // Differentiate ERC20 vs ERC721 based on topic count
          // ERC20 has 3 topics (sig, from, to)
          // ERC721 has 4 topics (sig, from, to, tokenId)
          if (log.topics.length === 3) {
            const decoded = decodeEventLog({
              abi: [TRANSFER_EVENT_ERC20],
              data: log.data as `0x${string}`,
              topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
            });
            if (decoded.eventName === 'Transfer') {
              movements.push({
                type: 'ERC20',
                from: decoded.args.from,
                to: decoded.args.to,
                amount: decoded.args.value,
                contractAddress: log.address,
              });
            }
          } else if (log.topics.length === 4) {
            const decoded = decodeEventLog({
              abi: [TRANSFER_EVENT_ERC721],
              data: log.data as `0x${string}`,
              topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
            });
            if (decoded.eventName === 'Transfer') {
              movements.push({
                type: 'ERC721',
                from: decoded.args.from,
                to: decoded.args.to,
                tokenId: decoded.args.tokenId,
                contractAddress: log.address,
              });
            }
          }
        } else if (signature === TRANSFER_SINGLE_SIGNATURE) {
          const decoded = decodeEventLog({
            abi: [TRANSFER_SINGLE_ERC1155],
            data: log.data as `0x${string}`,
            topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
          });
          if (decoded.eventName === 'TransferSingle') {
            movements.push({
              type: 'ERC1155',
              from: decoded.args.from,
              to: decoded.args.to,
              tokenId: decoded.args.id,
              amount: decoded.args.value,
              contractAddress: log.address,
            });
          }
        } else if (signature === TRANSFER_BATCH_SIGNATURE) {
          const decoded = decodeEventLog({
            abi: [TRANSFER_BATCH_ERC1155],
            data: log.data as `0x${string}`,
            topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
          });
          if (decoded.eventName === 'TransferBatch') {
            const { from, to, ids, values } = decoded.args;
            for (let i = 0; i < ids.length; i++) {
              movements.push({
                type: 'ERC1155',
                from,
                to,
                tokenId: ids[i]!,
                amount: values[i]!,
                contractAddress: log.address,
              });
            }
          }
        }
      } catch (err) {
        // Skip log if decoding fails (malformed or unexpected)
        console.warn(`Failed to decode log at ${log.address}:`, err);
      }
    }

    return movements;
  }
}
