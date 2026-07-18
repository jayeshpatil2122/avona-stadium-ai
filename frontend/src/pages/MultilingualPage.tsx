import { useMemo, useState } from "react";
import { generateAIResponse } from "../api/ai";
import StatusBadge from "../components/common/StatusBadge";
import type { StadiumRole } from "../types/role";

interface MultilingualPageProps {
  role: StadiumRole;
}

const targetLanguages = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "Portuguese",
  "Arabic",
];

const quickMessages = [
  "Where is the nearest medical center?",
  "Please guide me to Gate A.",
  "I need accessible seating assistance.",
];

function MultilingualPage({ role }: MultilingualPageProps) {
  const [language, setLanguage] = useState("Hindi");
  const [message, setMessage] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy Translation");

  const isArabic = language === "Arabic";
  const trimmedMessage = message.trim();
  const hasResponseState = loading || Boolean(error) || Boolean(translation);

  const characterCount = useMemo(() => message.length, [message]);

  const handleTranslate = async () => {
    if (!trimmedMessage) {
      setError("Enter a message before requesting a translation.");
      setTranslation("");
      return;
    }

    setLoading(true);
    setError("");
    setTranslation("");
    setCopyLabel("Copy Translation");

    try {
      const data = await generateAIResponse({
        module: "multilingual",
        user_role: role.value,
        language,
        stadium: "Demo World Cup Stadium",
        location: "",
        destination: "",
        prompt: trimmedMessage,
      });

      setTranslation(data.response);
    } catch (err) {
      console.error(err);
      setError("Unable to translate this message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!translation) {
      return;
    }

    try {
      await navigator.clipboard.writeText(translation);
      setCopyLabel("Copied");
      window.setTimeout(() => setCopyLabel("Copy Translation"), 1600);
    } catch (err) {
      console.error(err);
      setCopyLabel("Copy unavailable");
      window.setTimeout(() => setCopyLabel("Copy Translation"), 1600);
    }
  };

  return (
    <main className="multilingual-page">
      <section className="navigation-hero" aria-labelledby="multilingual-title">
        <div>
          <p className="eyebrow">AI-Assisted Stadium Translation</p>
          <h2 id="multilingual-title">Multilingual Intelligence</h2>
          <p>
            Translate stadium questions, support requests, and operational
            messages through the existing Avona StadiumAI backend.
          </p>
        </div>
        <StatusBadge tone="operational" pulse>
          Operational
        </StatusBadge>
      </section>

      <div className="multilingual-grid">
        <section className="panel translation-planner" aria-labelledby="translation-form-title">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Translation Console</p>
              <h2 id="translation-form-title">Translate with AI</h2>
            </div>
          </div>

          <form
            className="planner-form translation-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleTranslate();
            }}
          >
            <label>
              <span>Target Language</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              >
                {targetLanguages.map((targetLanguage) => (
                  <option value={targetLanguage} key={targetLanguage}>
                    {targetLanguage}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Message</span>
              <textarea
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  if (error) {
                    setError("");
                  }
                }}
                rows={7}
                placeholder="Type a stadium message for translation..."
                aria-describedby="message-helper"
              />
            </label>

            <div className="quick-message-row" aria-label="Quick message templates">
              {quickMessages.map((quickMessage) => (
                <button
                  className="quick-message"
                  type="button"
                  key={quickMessage}
                  onClick={() => setMessage(quickMessage)}
                >
                  {quickMessage}
                </button>
              ))}
            </div>

            <p className="field-helper" id="message-helper">
              {characterCount} characters. Quick message chips are optional demo
              accelerators.
            </p>

            <button className="primary-action" type="submit" disabled={loading}>
              {loading ? "Translating..." : "Translate with AI"}
            </button>
          </form>
        </section>

        {hasResponseState && (
          <section className="panel translation-result" aria-labelledby="translation-result-title">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Real Backend Response</p>
                <h2 id="translation-result-title">AI Translation Result</h2>
              </div>
              <button
                className="switch-role-button"
                type="button"
                onClick={handleCopy}
                disabled={!translation}
              >
                {copyLabel}
              </button>
            </div>

            <div className="response-body" aria-live="polite" aria-busy={loading}>
              {loading && (
                <div className="loading-state">
                  <span className="loader" aria-hidden="true" />
                  <p>Translating message with stadium context...</p>
                </div>
              )}

              {error && (
                <p className="error-state" role="alert">
                  {error}
                </p>
              )}

              {!loading && !error && translation && (
                <p className="ai-copy translation-copy" dir={isArabic ? "rtl" : "auto"}>
                  {translation}
                </p>
              )}
            </div>
          </section>
        )}

        {hasResponseState && (
          <aside className="panel context-panel" aria-labelledby="translation-context-title">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Request Context</p>
                <h2 id="translation-context-title">Current AI Context</h2>
              </div>
            </div>
            <dl>
              <div>
                <dt>User Role</dt>
                <dd>{role.label}</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>{language}</dd>
              </div>
              <div>
                <dt>Stadium</dt>
                <dd>Demo World Cup Stadium</dd>
              </div>
              <div>
                <dt>Module</dt>
                <dd>Multilingual</dd>
              </div>
            </dl>
          </aside>
        )}
      </div>
    </main>
  );
}

export default MultilingualPage;
