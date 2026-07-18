import type { AIRequest, AIResponse } from "../types/ai";

const API_URL =
  (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export async function generateAIResponse(
  data: AIRequest
): Promise<AIResponse> {
  const response = await fetch(`${API_URL}/api/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate AI response");
  }

  return response.json();
}
