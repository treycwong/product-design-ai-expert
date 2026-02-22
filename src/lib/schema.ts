import { z } from "zod";

export const FeedbackSchema = z.object({
  pros: z.array(z.string()).describe("List of positive design aspects"),
  friction_points: z
    .array(z.string())
    .describe("List of potential user friction points or UX issues"),
  accessibility_issues: z
    .array(z.string())
    .describe("List of accessibility concerns"),
  recommendations: z
    .array(z.string())
    .describe("Actionable recommendations to improve the design"),
});

export type FeedbackType = z.infer<typeof FeedbackSchema>;
