export interface NormalizedLog {
  address: string;
  topics: string[];
  data: string;
}

export interface NormalizedTransaction {
  /** The transaction hash */
  hash: string;
  /** The block number containing this transaction */
  blockNumber: bigint;
  /** The address of the sender */
  from: string;
  /** The address of the recipient, or null if it is a contract creation */
  to: string | null;
  /** The value transferred in wei */
  value: bigint;
  /** The transaction input data */
  input: string;
  /** The amount of gas used by this specific transaction */
  gasUsed: bigint;
  /** The actual gas price paid */
  effectiveGasPrice: bigint;
  /** The status of the transaction */
  status: 'success' | 'reverted';
  /** The timestamp of the block containing this transaction (in seconds) */
  timestamp: bigint;
  /** Logs emitted during the transaction execution */
  logs: NormalizedLog[];
}
