import type { NormalizedTransaction, AssetMovement } from '@txstory/shared';

export interface AnalyzedTransactionResponse {
  success: boolean;
  data?: {
    transaction: NormalizedTransaction;
    movements: AssetMovement[];
    story?: string;
  };
  error?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8700/api/v1';

export async function getAnalyzedTransaction(hash: string): Promise<AnalyzedTransactionResponse['data']> {
  const response = await fetch(`${API_URL}/transactions/${hash}`);
  
  const result: AnalyzedTransactionResponse = await response.json();
  
  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Failed to fetch transaction data');
  }

  return result.data;
}
