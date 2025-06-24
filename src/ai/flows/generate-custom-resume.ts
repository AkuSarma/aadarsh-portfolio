// src/ai/flows/generate-custom-resume.ts
'use server';

/**
 * @fileOverview Generates a custom resume using the Google Gemini API.
 *
 * - generateCustomResume - A function that handles the resume generation process.
 * - GenerateCustomResumeInput - The input type for the generateCustomResume function.
 * - GenerateCustomResumeOutput - The return type for the generateCustomResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCustomResumeInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to tailor the resume to.'),
  userDetails: z.string().describe('Details about the user to make the resume.'),
  detectedSkills: z.array(z.string()).describe('Skills detected to include in the resume.'),
});
export type GenerateCustomResumeInput = z.infer<typeof GenerateCustomResumeInputSchema>;

const GenerateCustomResumeOutputSchema = z.object({
  resume: z.string().describe('The generated resume content.'),
});
export type GenerateCustomResumeOutput = z.infer<typeof GenerateCustomResumeOutputSchema>;

export async function generateCustomResume(
  input: GenerateCustomResumeInput
): Promise<GenerateCustomResumeOutput> {
  return generateCustomResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCustomResumePrompt',
  input: {schema: GenerateCustomResumeInputSchema},
  output: {schema: GenerateCustomResumeOutputSchema},
  prompt: `You are an expert resume writer. You will generate a resume based on the job description, user details and detected skills.

Job Description: {{{jobDescription}}}
User Details: {{{userDetails}}}
Detected Skills: {{#each detectedSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Write a compelling resume based on the above information.
`, // Updated prompt to include detectedSkills
});

const generateCustomResumeFlow = ai.defineFlow(
  {
    name: 'generateCustomResumeFlow',
    inputSchema: GenerateCustomResumeInputSchema,
    outputSchema: GenerateCustomResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
