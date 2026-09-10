import { AIStoryGenerator } from './src/modules/transaction/generator/AIStoryGenerator.js';
import 'dotenv/config';

async function main() {
  const gen = new AIStoryGenerator();
  const res = await gen.generateStory(
    { status: 'success', from: '0x123', to: '0x456', value: 0n } as any,
    []
  );
  console.log(res);
}
main();
