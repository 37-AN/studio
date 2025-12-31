'use server';

/**
 * @fileOverview A tool suggestion AI agent.
 *
 * - suggestRelevantTools - A function that suggests relevant tools for automation.
 * - SuggestRelevantToolsInput - The input type for the suggestRelevantTools function.
 * - SuggestRelevantToolsOutput - The return type for the suggestRelevantTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantToolsInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('A description of the task the user is trying to automate.'),
});
export type SuggestRelevantToolsInput = z.infer<typeof SuggestRelevantToolsInputSchema>;

const SuggestRelevantToolsOutputSchema = z.object({
  suggestedTools: z
    .array(z.string())
    .describe('An array of tools relevant to the task, with links to setup pages.'),
});
export type SuggestRelevantToolsOutput = z.infer<typeof SuggestRelevantToolsOutputSchema>;

export async function suggestRelevantTools(input: SuggestRelevantToolsInput): Promise<SuggestRelevantToolsOutput> {
  return suggestRelevantToolsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantToolsPrompt',
  input: {schema: SuggestRelevantToolsInputSchema},
  output: {schema: SuggestRelevantToolsOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant tools for automation tasks.
  Based on the user's description of the task they are trying to automate, suggest a list of tools that can help them.
  Include direct links to the setup pages for each tool.

  Task Description: {{{taskDescription}}}

  Suggest tools:
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const suggestRelevantToolsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantToolsFlow',
    inputSchema: SuggestRelevantToolsInputSchema,
    outputSchema: SuggestRelevantToolsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
