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
  skinToneAnalysis: z
    .string()
    .describe("A detailed analysis of the user's skin tone, including undertones and suggestions."),
  facialStructureAnalysis: z
    .string()
    .describe(
      "A detailed analysis of the user's facial structure, including face shape and key features."
    ),
  generalBeautyRecommendations: z
    .string()
    .describe(
      "General beauty recommendations based on the analyzed skin tone and facial structure, such as suitable makeup shades, hairstyles, or skincare tips."
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
  prompt: `You are an expert AI beauty advisor. Your task is to analyze the provided selfie image and determine the user's skin tone and facial structure. Based on this analysis, provide general beauty recommendations.

Analyze the following selfie image:
Photo: {{media url=selfieDataUri}}

Provide your analysis and recommendations in the specified JSON format.`,
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
