import { useMemo, useState } from "react";
import StatusBadge from "../components/common/StatusBadge";
import ResponsePanel from "../components/common/ResponsePanel";
import { useAIRequest } from "../hooks/useAIRequest";
import { STADIUM_NAME } from "../constants/stadium";
import { LANGUAGES, getLanguageConfig } from "../constants/languages";
import type { StadiumRole } from "../types/role";

interface MultilingualPageProps {
  role: StadiumRole;
}

const quickMessages = [
  "Where is the nearest medical center?",
  "Please guide me to Gate A.",
  "I need accessible seating assistance.",
  "Where is the nearest toilet?",
  "How do I reach the exit?",
];

function MultilingualPage({ role }: MultilingualPageProps) {
  const [language, setLanguage] = useState("Spanish");
  const [message, setMessage] = useState("");
  const { response, loading, error, execute, reset } = useAIRequest();
  const translation = response?.response ?? "";

  const langConfig = useMemo(() => getLanguageConfig(language), [language]);
  const trimmedMessage = message.trim();
  const hasResponseState = loading || Boolean(error) || Boolean(translation);
  const characterCount = useMemo(() => message.length, [message]);

  const handleTranslate = () => {
    if (!trimmedMessage) {
      return;
    }

    void execute(
      {
        module: "multilingual",
        user_role: role.value,
        language,
        stadium: STADIUM_NAME,
        location: null,
        destination: null,
        prompt: trimmedMessage,
      },
      "Unable to translate this message. Please try again.",
    );
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
                onChange={(event) => {
                  setLanguage(event.target.value);
                  reset();
                }}
              >
                {LANGUAGES.map((lang) => (
                  <option value={lang.name} key={lang.name}>
                    {lang.name} ({lang.code})
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
                  reset();
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
                  onClick={() => {
                    setMessage(quickMessage);
                    reset();
                  }}
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
          <ResponsePanel
            title="AI Translation Result"
            className="translation-result"
            result={translation}
            loading={loading}
            error={error}
            loadingMessage="Translating message with stadium context..."
            dir={langConfig.dir}
            langCode={langConfig.code}
            groundingSource="Grounded in: User Input Prompt • Groq Translation Context"
          />
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
                <dt>Target Language</dt>
                <dd>{language}</dd>
              </div>
              <div>
                <dt>Direction</dt>
                <dd style={{ textTransform: "uppercase" }}>{langConfig.dir}</dd>
              </div>
              <div>
                <dt>Locale Code</dt>
                <dd>{langConfig.code}</dd>
              </div>
              <div>
                <dt>Stadium</dt>
                <dd>{STADIUM_NAME}</dd>
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
