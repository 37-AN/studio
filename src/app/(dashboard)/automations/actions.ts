"use server";

import { suggestRelevantTools, type SuggestRelevantToolsOutput } from "@/ai/flows/suggest-relevant-tools";
import { z } from "zod";

const SuggestionSchema = z.object({
  taskDescription: z.string().min(10, "Please describe your task in more detail."),
});

type State = {
  message?: string | null;
  suggestions?: SuggestRelevantToolsOutput | null;
  errors?: {
    taskDescription?: string[];
  }
};

export async function getToolSuggestions(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = SuggestionSchema.safeParse({
    taskDescription: formData.get("taskDescription"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  try {
    const result = await suggestRelevantTools({
      taskDescription: validatedFields.data.taskDescription,
    });
    return {
      message: "success",
      suggestions: result,
    };
  } catch (e) {
    return {
      message: "An error occurred while fetching suggestions.",
    };
  }
}
