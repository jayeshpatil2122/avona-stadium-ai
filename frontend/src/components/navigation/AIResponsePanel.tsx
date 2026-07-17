interface AIResponsePanelProps {
  result: string;
  loading: boolean;
  error: string;
}

function AIResponsePanel({ result, loading, error }: AIResponsePanelProps) {
  return (
    <section className="panel ai-response" aria-labelledby="ai-response-title">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Groq LLM Output</p>
          <h2 id="ai-response-title">AI Navigation Guidance</h2>
        </div>
      </div>

      <div className="response-body" aria-live="polite" aria-busy={loading}>
        {loading && (
          <div className="loading-state">
            <span className="loader" aria-hidden="true" />
            <p>Analyzing verified stadium route data...</p>
          </div>
        )}

        {error && (
          <p className="error-state" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && result && <p className="ai-copy">{result}</p>}

        {!loading && !error && !result && (
          <p className="muted-copy">
            Your real backend AI response will appear here after a route request.
          </p>
        )}
      </div>
    </section>
  );
}

export default AIResponsePanel;
