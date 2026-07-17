import { useState } from "react";
import { generateAIResponse } from "../api/ai";
import StatusBadge from "../components/common/StatusBadge";
import AIResponsePanel from "../components/navigation/AIResponsePanel";
import RoutePlanner from "../components/navigation/RoutePlanner";
import RouteVisualization from "../components/navigation/RouteVisualization";
import type { StadiumRole } from "../types/role";

interface NavigationPageProps {
  role: StadiumRole;
}

function NavigationPage({ role }: NavigationPageProps) {
  const [location, setLocation] = useState("Main Entrance");
  const [destination, setDestination] = useState("Gate A");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hasResponseState = loading || Boolean(error) || Boolean(result);

  const handleNavigate = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const data = await generateAIResponse({
        module: "navigation",
        user_role: role.value,
        language: "English",
        stadium: "Demo World Cup Stadium",
        location,
        destination,
        prompt: `Give me step-by-step directions from ${location} to ${destination}.`,
      });

      setResult(data.response);
    } catch (err) {
      console.error(err);
      setError("Unable to generate navigation guidance. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <AIResponsePanel result={result} loading={loading} error={error} />
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
                <dd>Demo World Cup Stadium</dd>
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
