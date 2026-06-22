'use server';
/**
 * @fileOverview An AI agent for analyzing selfies to determine skin tone and facial structure.
 *
 * - analyzeFace - A function that handles the AI face analysis process.
 * - AnalyzeFaceInput - The input type for the analyzeFace function.
 * - AnalyzeFaceOutput - The return type for the analyzeFace function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFaceInputSchema = z.object({
  selfieDataUri: z
    .string()
    .describe(
      "A selfie photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeFaceInput = z.infer<typeof AnalyzeFaceInputSchema>;

const AnalyzeFaceOutputSchema = z.object({
  skinType: z.string().describe("The user's detected skin type (e.g., Oily, Dry, Combination, Sensitive)."),
  skinTone: z.string().describe("The user's skin tone and undertone (e.g., Cool Ivory, Warm Sand)."),
  faceShape: z.string().describe("The user's face shape (e.g., Oval, Round, Square, Heart, Diamond)."),
  confidenceScore: z.number().describe("AI's confidence score in the analysis as a percentage (0-100)."),
  skinToneAnalysis: z
    .string()
    .describe("A detailed analysis of the user's skin tone, including undertones and suggestions."),
  facialStructureAnalysis: z
    .string()
    .describe(
      "A detailed analysis of the user's facial structure, including face shape and key features."
    ),
});
export type AnalyzeFaceOutput = z.infer<typeof AnalyzeFaceOutputSchema>;

export async function analyzeFace(input: AnalyzeFaceInput): Promise<AnalyzeFaceOutput> {
  return aiFaceAnalysisFlow(input);
}

const aiFaceAnalysisPrompt = ai.definePrompt({
  name: 'aiFaceAnalysisPrompt',
  input: {schema: AnalyzeFaceInputSchema},
  output: {schema: AnalyzeFaceOutputSchema},
  prompt: `You are an expert AI beauty advisor. Your task is to analyze the provided selfie image and determine the user's skin tone, skin type, and facial structure. 

Analyze the following selfie image:
Photo: {{media url=selfieDataUri}}

In your analysis:
1. Identify the exact Face Shape (Oval, Round, Square, Heart, Diamond, etc.).
2. Determine Skin Type (Oily, Dry, Combination, etc.).
3. Identify Skin Tone and Undertone (e.g., Fair with Cool Undertones).
4. Provide a confidence score for your analysis.
5. Elaborate on the skin tone and facial structure in the descriptive fields.

Provide your analysis in the specified JSON format.`,
  model: 'googleai/gemini-1.5-flash-latest',
});

const aiFaceAnalysisFlow = ai.defineFlow(
  {
    name: 'aiFaceAnalysisFlow',
    inputSchema: AnalyzeFaceInputSchema,
    outputSchema: AnalyzeFaceOutputSchema,
  },
  async input => {
    const {output} = await aiFaceAnalysisPrompt(input);
    return output!;
  }
);
