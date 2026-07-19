import { useState } from "react";
import StatusBadge from "../components/common/StatusBadge";
import ResponsePanel from "../components/common/ResponsePanel";
import RoutePlanner from "../components/navigation/RoutePlanner";
import RouteVisualization from "../components/navigation/RouteVisualization";
import { useAIRequest } from "../hooks/useAIRequest";
import { STADIUM_NAME } from "../constants/stadium";
import type { StadiumRole } from "../types/role";

interface NavigationPageProps {
  role: StadiumRole;
}

function NavigationPage({ role }: NavigationPageProps) {
  const [location, setLocation] = useState("Main Entrance");
  const [destination, setDestination] = useState("Gate A");
  const { response, loading, error, execute } = useAIRequest();
  const result = response?.response ?? "";
  const hasResponseState = loading || Boolean(error) || Boolean(result);

  const handleNavigate = () => {
    void execute(
      {
        module: "navigation",
        user_role: role.value,
        language: "English",
        stadium: STADIUM_NAME,
        location,
        destination,
        prompt: `Give me step-by-step directions from ${location} to ${destination}.`,
      },
      "Unable to generate navigation guidance. Please try again.",
    );
  };

  return (
    <main className="navigation-page">
      <section className="navigation-hero" aria-labelledby="navigation-title">
        <div>
          <p className="eyebrow">AI-Assisted Verified Stadium Routing</p>
          <h2 id="navigation-title">Navigation Intelligence</h2>
          <p>
            Route requests are sent to the existing FastAPI Navigation
            Intelligence endpoint and answered with real backend AI guidance.
          </p>
        </div>
        <StatusBadge tone="operational" pulse>
          Operational
        </StatusBadge>
      </section>

      <div className="navigation-grid">
        <RoutePlanner
          location={location}
          destination={destination}
          loading={loading}
          onLocationChange={setLocation}
          onDestinationChange={setDestination}
          onSubmit={handleNavigate}
        />

        {hasResponseState && (
          <ResponsePanel
            title="AI Navigation Guidance"
            eyebrow="Groq LLM Output"
            className="ai-response"
            result={result}
            loading={loading}
            error={error}
            loadingMessage="Analyzing verified stadium route data..."
            langCode="en-US"
            groundingSource="Grounded in: Bidirectional BFS Route Finder • Simulated Demo Data"
          />
        )}

        {result && (
          <RouteVisualization
            location={location}
            destination={destination}
            hasResult={Boolean(result)}
          />
        )}

        {hasResponseState && (
          <aside className="panel context-panel" aria-labelledby="context-title">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Request Context</p>
                <h2 id="context-title">Current AI Context</h2>
              </div>
            </div>
            <dl>
              <div>
                <dt>User Role</dt>
                <dd>{role.label}</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>English</dd>
              </div>
              <div>
                <dt>Stadium</dt>
                <dd>{STADIUM_NAME}</dd>
              </div>
              <div>
                <dt>Module</dt>
                <dd>Navigation</dd>
              </div>
            </dl>
          </aside>
        )}
      </div>
    </main>
  );
}

export default NavigationPage;
