
'use server';
/**
 * @fileOverview A cake design AI agent.
 *
 * - generateCake - A function that handles the cake design process.
 * - CakeDesignerInput - The input type for the generateCake function.
 * - CakeDesignerOutput - The return type for the generateCake function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';

const CakeDesignerInputSchema = z.object({
  description: z.string().describe('The description of the event and theme for the cake.'),
});
export type CakeDesignerInput = z.infer<typeof CakeDesignerInputSchema>;

const CakeDesignerOutputSchema = z.object({
  cakeName: z.string().describe('A creative and fun name for the cake concept.'),
  cakeDescription: z
    .string()
    .describe(
      'A detailed, two-sentence description of the cake, including flavors, colors, and decorations.'
    ),
  imageUrl: z
    .string()
    .describe('A placeholder image URL from picsum.photos for the generated cake concept.'),
  imageHint: z
    .string()
    .describe('A one or two-word hint for searching for a real image.'),
});
export type CakeDesignerOutput = z.infer<typeof CakeDesignerOutputSchema>;

export async function generateCake(input: CakeDesignerInput): Promise<CakeDesignerOutput> {
  return cakeDesignerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cakeDesignerPrompt',
  input: { schema: CakeDesignerInputSchema },
  output: { schema: CakeDesignerOutputSchema },
  model: googleAI.model('gemini-2.5-flash'),
  prompt: `
    You are an expert cake designer for a shop called "Doorstep Desserts".
    Your task is to design a unique cake based on a user's event description.

    Based on the following description, create a concept for a cake.
    Description: {{{description}}}

    Your response should include:
    1. A creative and fun name for the cake.
    2. A detailed, two-sentence description of the cake, including potential flavors, colors, and decorations that fit the theme.
    3. A placeholder image URL using the format: https://picsum.photos/seed/{a random number}/600/400
    4. A one or two-word hint for searching for a real image (e.g., "space cake", "travel theme").
  `,
});

const cakeDesignerFlow = ai.defineFlow(
  {
    name: 'cakeDesignerFlow',
    inputSchema: CakeDesignerInputSchema,
    outputSchema: CakeDesignerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("The AI failed to generate a cake design.");
    }

    // Since Math.random() can cause hydration issues if used directly in the client,
    // we ensure a random seed is generated on the server as part of the flow.
    // The prompt asks the LLM to do this, but we can enforce it here as a backup.
    if (!output.imageUrl.includes('picsum.photos')) {
        const randomSeed = Math.floor(Math.random() * 1000);
        output.imageUrl = `https://picsum.photos/seed/${randomSeed}/600/400`;
    }

    return output;
  }
);
