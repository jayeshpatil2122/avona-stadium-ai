import { useCallback, useState, useRef, useEffect } from "react";
import { generateAIResponse } from "../api/ai";
import type { AIRequest, AIResponse } from "../types/ai";

interface AIRequestState {
  response: AIResponse | null;
  loading: boolean;
  error: string;
}

interface UseAIRequestResult extends AIRequestState {
  execute: (request: AIRequest, fallbackError: string) => Promise<void>;
  reset: () => void;
  setError: (message: string) => void;
}

const initialState: AIRequestState = {
  response: null,
  loading: false,
  error: "",
};

export function useAIRequest(): UseAIRequestResult {
  const [state, setState] = useState<AIRequestState>(initialState);
  const activeControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (request: AIRequest, fallbackError: string) => {
      if (activeControllerRef.current) {
        activeControllerRef.current.abort();
      }

      const controller = new AbortController();
      activeControllerRef.current = controller;

      setState({ response: null, loading: true, error: "" });

      try {
        const response = await generateAIResponse(request, controller.signal);
        setState({ response, loading: false, error: "" });
      } catch (err: unknown) {
        const errorName = (err as Error)?.name;
        if (errorName !== "AbortError") {
          setState({ response: null, loading: false, error: fallbackError });
        }
      } finally {
        if (activeControllerRef.current === controller) {
          activeControllerRef.current = null;
        }
      }
    },
    [],
  );

  const reset = useCallback(() => {
    if (activeControllerRef.current) {
      activeControllerRef.current.abort();
    }
    setState(initialState);
  }, []);

  const setError = useCallback(
    (message: string) => {
      if (activeControllerRef.current) {
        activeControllerRef.current.abort();
      }
      setState({ response: null, loading: false, error: message });
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (activeControllerRef.current) {
        activeControllerRef.current.abort();
      }
    };
  }, []);

  return { ...state, execute, reset, setError };
}
