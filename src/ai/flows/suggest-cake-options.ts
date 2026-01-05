'use server';

/**
 * @fileOverview This file defines a Genkit flow 
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCakeOptionsInputSchema = z.object({
  celebrantGender: z
    .string()
    .describe("The gender of the person for whom the cake is being made."),
  celebrantHobbies: z
    .string()
    .describe("A description of the celebrant's hobbies and interests."),
  eventDescription: z
    .string()
    .describe('A description of the event for which the cake is needed.'),
});

export type SuggestCakeOptionsInput = z.infer<typeof SuggestCakeOptionsInputSchema>;

const SuggestCakeOptionsOutputSchema = z.object({
  cakeSuggestion: z
    .string()
    .describe('A detailed suggestion for the cake, including flavor and decoration.'),
});

export type SuggestCakeOptionsOutput = z.infer<typeof SuggestCakeOptionsOutputSchema>;

export async function suggestCakeOptions(input: SuggestCakeOptionsInput): Promise<SuggestCakeOptionsOutput> {
  return suggestCakeOptionsFlow(input);
}

const suggestCakeOptionsPrompt = ai.definePrompt({
  name: 'suggestCakeOptionsPrompt',
  input: {schema: SuggestCakeOptionsInputSchema},
  output: {schema: SuggestCakeOptionsOutputSchema},
  prompt: `Based on the following information about the celebrant and the event, suggest a cake flavor and decorations:

Celebrant Gender: {{{celebrantGender}}}
Hobbies and Interests: {{{celebrantHobbies}}}
Event Description: {{{eventDescription}}}

Consider all of this information carefully, and provide a suggestion for the cake including flavors, decorations, and overall design.`,
});

const suggestCakeOptionsFlow = ai.defineFlow(
  {
    name: 'suggestCakeOptionsFlow',
    inputSchema: SuggestCakeOptionsInputSchema,
    outputSchema: SuggestCakeOptionsOutputSchema,
  },
  async input => {
    const {output} = await suggestCakeOptionsPrompt(input);
    return output!;
  }
);
