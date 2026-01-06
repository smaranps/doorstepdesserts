
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
    .describe('A data URI of the generated cake concept image.'),
  imageHint: z
    .string()
    .describe('A one or two-word hint for searching for a real image.'),
});
export type CakeDesignerOutput = z.infer<typeof CakeDesignerOutputSchema>;

export async function generateCake(input: CakeDesignerInput): Promise<CakeDesignerOutput> {
  return cakeDesignerFlow(input);
}

const textPrompt = ai.definePrompt({
  name: 'cakeDesignerTextPrompt',
  input: { schema: CakeDesignerInputSchema },
  output: { schema: z.object({
    cakeName: CakeDesignerOutputSchema.shape.cakeName,
    cakeDescription: CakeDesignerOutputSchema.shape.cakeDescription,
    imageHint: CakeDesignerOutputSchema.shape.imageHint,
  }) },
  model: googleAI.model('gemini-2.5-flash'),
  prompt: `
    You are an expert cake designer for a shop called "Doorstep Desserts".
    Your task is to design a unique cake concept based on a user's event description.

    Based on the following description, create a concept for a cake.
    Description: {{{description}}}

    Your response should include:
    1. A creative and fun name for the cake.
    2. A detailed, two-sentence description of the cake, including potential flavors, colors, and decorations that fit the theme.
    3. A one or two-word hint for searching for a real image (e.g., "space cake", "travel theme").
  `,
});

const cakeDesignerFlow = ai.defineFlow(
  {
    name: 'cakeDesignerFlow',
    inputSchema: CakeDesignerInputSchema,
    outputSchema: CakeDesignerOutputSchema,
  },
  async (input) => {
    // Step 1: Generate the cake concept text.
    const { output: textOutput } = await textPrompt(input);
    if (!textOutput) {
        throw new Error("The AI failed to generate a cake design description.");
    }

    // Step 2: Create a consistent placeholder image URL using the image hint as a seed.
    const seed = encodeURIComponent(textOutput.imageHint);
    const imageUrl = `https://picsum.photos/seed/${seed}/600/400`;
    
    // Step 3: Combine text and image into the final output.
    return {
        ...textOutput,
        imageUrl,
    };
  }
);
