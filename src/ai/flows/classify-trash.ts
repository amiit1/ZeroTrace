'use server';
/**
 * @fileOverview Classifies trash as organic or inorganic using the Gemini API.
 *
 * - classifyTrash - A function that classifies trash.
 * - ClassifyTrashInput - The input type for the classifyTrash function.
 * - ClassifyTrashOutput - The return type for the classifyTrash function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyTrashInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the trash, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyTrashInput = z.infer<typeof ClassifyTrashInputSchema>;

const ClassifyTrashOutputSchema = z.object({
  trashType: z
    .enum(['organic', 'inorganic'])
    .describe('The type of trash, either organic or inorganic.'),
  confidence: z
    .number()
    .describe('The confidence level of the classification (0-1).'),
});
export type ClassifyTrashOutput = z.infer<typeof ClassifyTrashOutputSchema>;

export async function classifyTrash(input: ClassifyTrashInput): Promise<ClassifyTrashOutput> {
  return classifyTrashFlow(input);
}

const classifyTrashPrompt = ai.definePrompt({
  name: 'classifyTrashPrompt',
  input: {schema: ClassifyTrashInputSchema},
  output: {schema: ClassifyTrashOutputSchema},
  prompt: `You are an AI expert in trash classification.

You will be provided with an image of trash, and your task is to classify it as either organic or inorganic.

Analyze the following image and classify the trash type. Also, indicate your confidence in the classification.

Image: {{media url=photoDataUri}}

Ensure your response follows the schema accurately.
`,
});

const classifyTrashFlow = ai.defineFlow(
  {
    name: 'classifyTrashFlow',
    inputSchema: ClassifyTrashInputSchema,
    outputSchema: ClassifyTrashOutputSchema,
  },
  async input => {
    const {output} = await classifyTrashPrompt(input);
    return output!;
  }
);
