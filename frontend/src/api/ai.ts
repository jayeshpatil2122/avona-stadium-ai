import type { AIRequest, AIResponse } from "../types/ai";

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
const REQUEST_TIMEOUT_MS = 15_000;

export async function generateAIResponse(
  data: AIRequest,
  signal?: AbortSignal,
): Promise<AIResponse> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  if (signal) {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener("abort", () => controller.abort());
    }
  }

  try {
    const response = await fetch(`${API_URL}/api/ai/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`AI request failed with status ${response.status}`);
    }

    return (await response.json()) as AIResponse;
  } finally {
    window.clearTimeout(timeout);
  }
}
