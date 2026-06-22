'use server';
/**
 * @fileOverview A Genkit flow for generating personalized beauty recommendations based on AI face analysis.
 *
 * - generatePersonalizedBeautyRecommendations - A function that handles the beauty recommendation process.
 * - PersonalizedBeautyRecommendationsInput - The input type for the generatePersonalizedBeautyRecommendations function.
 * - PersonalizedBeautyRecommendationsOutput - The return type for the generatePersonalizedBeautyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedBeautyRecommendationsInputSchema = z.object({
  skinTone: z
    .string()
    .describe('The detected skin tone (e.g., "warm", "cool", "neutral").'),
  faceShape: z
    .string()
    .describe('The detected face shape (e.g., "oval", "round", "square").'),
  hairType: z
    .string()
    .describe(
      'The user\u0027s hair type (e.g., "straight", "wavy", "curly", "coily").'
    )
    .optional(),
  skinConcerns: z
    .array(z.string())
    .describe(
      'An array of detected skin concerns (e.g., "dryness", "acne", "fine lines").'
    )
    .optional(),
  currentStylePreferences: z
    .string()
    .describe(
      'A description of the user\u0027s current beauty style preferences.'
    )
    .optional(),
});
export type PersonalizedBeautyRecommendationsInput = z.infer<
  typeof PersonalizedBeautyRecommendationsInputSchema
>;

const PersonalizedBeautyRecommendationsOutputSchema = z.object({
  hairstyles: z.array(z.string()).describe('Recommended hairstyles.'),
  skincareRoutine: z.array(z.string()).describe('Recommended skincare products or routine steps.'),
  cosmeticServices: z.array(z.string()).describe('Recommended cosmetic services (e.g., facials, makeup consultations).'),
  generalTips: z.array(z.string()).describe('General beauty tips based on the analysis.'),
});
export type PersonalizedBeautyRecommendationsOutput = z.infer<
  typeof PersonalizedBeautyRecommendationsOutputSchema
>;

export async function generatePersonalizedBeautyRecommendations(
  input: PersonalizedBeautyRecommendationsInput
): Promise<PersonalizedBeautyRecommendationsOutput> {
  return personalizedBeautyRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBeautyRecommendationsPrompt',
  input: { schema: PersonalizedBeautyRecommendationsInputSchema },
  output: { schema: PersonalizedBeautyRecommendationsOutputSchema },
  prompt: `You are an expert beauty consultant specializing in personalized recommendations.
Based on the following AI face analysis data, provide tailored recommendations for hairstyles, skincare, and cosmetic services.

AI Face Analysis:
- Skin Tone: {{{skinTone}}}
- Face Shape: {{{faceShape}}}
{{#if hairType}}
- Hair Type: {{{hairType}}}
{{/if}}
{{#if skinConcerns}}
- Skin Concerns: {{#each skinConcerns}}- {{{this}}}\n{{/each}}{{/if}}
{{#if currentStylePreferences}}
- Current Style Preferences: {{{currentStylePreferences}}}
{{/if}}

Provide specific and actionable recommendations in the following categories:
1. Hairstyles: Suggest 2-3 suitable hairstyles that complement the face shape and skin tone.
2. Skincare Routine: Outline a simple skincare routine and suggest types of products for the skin tone and concerns.
3. Cosmetic Services: Recommend 1-2 professional cosmetic services that would enhance the user's features or address concerns.
4. General Tips: Provide 1-2 general beauty tips relevant to the analysis.
`,
});

const personalizedBeautyRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedBeautyRecommendationsFlow',
    inputSchema: PersonalizedBeautyRecommendationsInputSchema,
    outputSchema: PersonalizedBeautyRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
