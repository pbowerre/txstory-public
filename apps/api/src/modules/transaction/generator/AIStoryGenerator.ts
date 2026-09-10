import { Groq } from 'groq-sdk';
import type { NormalizedTransaction, AssetMovement } from '@txstory/shared';

export class AIStoryGenerator {
  private groq: Groq;
  private model: string;

  constructor() {
    this.groq = new Groq({ 
      apiKey: process.env.AI_API_KEY
    });
    this.model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
  }

  async generateStory(transaction: NormalizedTransaction, movements: AssetMovement[]): Promise<string> {
    try {
      const systemPrompt = `You are a helpful blockchain assistant that translates complex transaction data into a simple, natural, and easy-to-understand story for everyday users. Describe what happened in this transaction in a friendly, conversational tone (1-3 sentences max). Group similar transfers together if there are many. Do not just list out raw data, and do not use robotic phrasing. Focus on the human element (e.g. "Someone sent...", "A wallet transferred..."). Make it sound natural and easy to read.`;

      const shortAddr = (addr: string | null) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Contract Creation';

      const prompt = `
Transaction Data:
- Status: ${transaction.status}
- Sender: ${shortAddr(transaction.from)}
- Receiver: ${shortAddr(transaction.to)}

Asset Transfers:
${movements.length > 0 ? movements.map(m => {
  const formatAmount = (amt: bigint) => {
    const s = amt.toString();
    if (s === '0') return '0';
    let formatted = '0';
    if (s.length <= 18) {
      formatted = '0.' + s.padStart(18, '0');
    } else {
      formatted = BigInt(s.slice(0, -18)).toLocaleString('en-US') + '.' + s.slice(-18);
    }
    // Round to 4 decimal places for readability
    const parts = formatted.split('.');
    if (parts.length === 2 && parts[1] !== undefined) {
      const decimals = parts[1].substring(0, 4).replace(/0+$/, '');
      return decimals ? `${parts[0]}.${decimals}` : parts[0];
    }
    return formatted;
  };

  const typeName = m.type === 'NATIVE' ? 'ETH/BNB' : m.type;

  if (m.type === 'ERC721') return `- ${typeName} NFT (ID: ${m.tokenId.toString()}) sent from ${shortAddr(m.from)} to ${shortAddr(m.to)}`;
  if (m.type === 'ERC1155') return `- ${typeName} tokens (ID: ${m.tokenId.toString()}, Amount: ${m.amount.toString()}) sent from ${shortAddr(m.from)} to ${shortAddr(m.to)}`;
  return `- ${formatAmount(m.amount)} ${typeName} tokens sent from ${shortAddr(m.from)} to ${shortAddr(m.to)}`;
}).join('\n') : '- None'}

Write the summary now:
`;

      const response = await this.groq.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt.trim() }
        ],
        temperature: 0.1, // Very low temperature to prevent hallucination
      });

      return response.choices[0]?.message?.content || "Oops! I couldn't generate a story for this transaction right now.";
    } catch (error) {
      console.error('Failed to generate AI story with Groq:', error);
      return "Oops! I couldn't generate a story for this transaction right now.";
    }
  }
}
