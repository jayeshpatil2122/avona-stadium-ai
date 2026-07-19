import { type ReactNode, useState } from "react";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";

interface ResponsePanelProps {
  title: string;
  eyebrow?: string;
  className?: string;
  result: string;
  loading: boolean;
  error: string;
  loadingMessage?: string;
  emptyMessage?: string;
  headerAction?: ReactNode;
  dir?: "rtl" | "ltr" | "auto";
  langCode?: string;
  groundingSource?: string;
}

function ResponsePanel({
  title,
  eyebrow = "Real Backend Response",
  className = "ai-response-panel",
  result,
  loading,
  error,
  loadingMessage = "Analyzing data with stadium context...",
  emptyMessage,
  headerAction,
  dir = "auto",
  langCode = "en-US",
  groundingSource,
}: ResponsePanelProps) {
  const panelId = `${title.toLowerCase().replace(/\s+/g, "-")}-title`;
  const { speak, stop, isSpeaking, supported } = useSpeechSynthesis();
  const [copied, setCopied] = useState(false);
  const [easyRead, setEasyRead] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore copy failures gracefully
    }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(result, langCode);
    }
  };

  return (
    <section className={`panel ${className}`} aria-labelledby={panelId}>
      <div className="panel__header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={panelId}>{title}</h2>
        </div>

        <div className="panel__header-actions" style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          {result && !loading && !error && (
            <>
              {supported && (
                <button
                  className="switch-role-button"
                  type="button"
                  onClick={handleSpeak}
                  aria-label={isSpeaking ? "Stop speaking response" : "Read response aloud"}
                >
                  {isSpeaking ? "⏹ Stop" : "🔊 Speak"}
                </button>
              )}

              <button
                className="switch-role-button"
                type="button"
                onClick={() => setEasyRead((prev) => !prev)}
                aria-pressed={easyRead}
                aria-label="Toggle easy read font sizing mode"
              >
                {easyRead ? "Aa Normal" : "Aa Larger"}
              </button>

              <button
                className="switch-role-button"
                type="button"
                onClick={handleCopy}
                aria-label="Copy response text"
              >
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
            </>
          )}
          {headerAction}
        </div>
      </div>

      <div className="response-body" aria-live="polite" aria-busy={loading}>
        {loading && (
          <div className="loading-state">
            <span className="loader" aria-hidden="true" />
            <p>{loadingMessage}</p>
          </div>
        )}

        {error && (
          <p className="error-state" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && result && (
          <p className={`ai-copy ${easyRead ? "ai-copy--easy-read" : ""}`} dir={dir}>
            {result}
          </p>
        )}

        {!loading && !error && !result && emptyMessage && (
          <p className="muted-copy">{emptyMessage}</p>
        )}

        {groundingSource && !loading && !error && result && (
          <div
            className="grounding-badge"
            style={{
              marginTop: "1.25rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--border-color)",
              fontSize: "0.825rem",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-color)",
              }}
            />
            {groundingSource}
          </div>
        )}
      </div>
    </section>
  );
}

export default ResponsePanel;
