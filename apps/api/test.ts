import { Groq } from 'groq-sdk';
import 'dotenv/config';

const groq = new Groq({ apiKey: process.env.AI_API_KEY });

async function main() {
  try {
    const models = await groq.models.list();
    console.log(JSON.stringify(models.data.map(m => m.id), null, 2));
  } catch (err) {
    console.error(err);
  }
}

main();
