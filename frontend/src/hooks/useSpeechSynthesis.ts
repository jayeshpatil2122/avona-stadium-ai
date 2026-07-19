import { useCallback, useEffect, useRef, useState } from "react";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback((text: string, langCode: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    // Cancel any active speech first
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    utterance.lang = langCode;

    // Retrieve system voices
    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find((v) => v.lang === langCode);

    if (!voice) {
      // Fallback matching language prefix (e.g. "es" instead of "es-ES")
      const prefix = langCode.split("-")[0];
      voice = voices.find((v) => v.lang.startsWith(prefix));
    }

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, []);

  // Cleanup speech when navigating away
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    supported: typeof window !== "undefined" && !!window.speechSynthesis,
  };
}
