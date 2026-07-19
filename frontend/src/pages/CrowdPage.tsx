import { useState } from "react";
import StatusBadge from "../components/common/StatusBadge";
import ResponsePanel from "../components/common/ResponsePanel";
import { useAIRequest } from "../hooks/useAIRequest";
import {
  CROWD_ZONES,
  STADIUM_NAME,
  type CrowdZone,
  type StadiumLocation,
} from "../constants/stadium";
import type { StadiumRole } from "../types/role";

interface CrowdPageProps {
  role: StadiumRole;
}

type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

function getRiskLevel(density: number): RiskLevel {
  if (density >= 85) {
    return "Critical";
  }

  if (density >= 70) {
    return "High";
  }

  if (density >= 50) {
    return "Moderate";
  }

  return "Low";
}

function CrowdPage({ role }: CrowdPageProps) {
  const [selectedZone, setSelectedZone] = useState<StadiumLocation>("North Concourse");
  const { response, loading, error, execute, reset } = useAIRequest();
  const recommendation = response?.response ?? "";

  const activeZone: CrowdZone =
    CROWD_ZONES.find((zone) => zone.name === selectedZone) ?? CROWD_ZONES[0];
  const density = Math.round((activeZone.occupancy / activeZone.capacity) * 100);
  const riskLevel = getRiskLevel(density);
  const hasResponseState = loading || Boolean(error) || Boolean(recommendation);

  const handleAnalyzeCrowd = () => {
    void execute(
      {
        module: "crowd",
        user_role: "operations",
        language: "English",
        stadium: STADIUM_NAME,
        location: selectedZone,
        destination: null,
        prompt: "Analyze the current crowd situation and recommend operational actions.",
      },
      "Unable to generate crowd recommendation. Please try again.",
    );
  };

  return (
    <main className="crowd-page">
      <section className="navigation-hero" aria-labelledby="crowd-title">
        <div>
          <p className="eyebrow">Crowd Intelligence</p>
          <h2 id="crowd-title">AI-Assisted Crowd Operations</h2>
          <p>
            Monitor simulated stadium crowd conditions, identify congestion risks,
            and generate AI-assisted operational recommendations using verified
            demo data.
          </p>
        </div>
        <div className="crowd-hero-status">
          <StatusBadge tone="operational" pulse>
            Operational
          </StatusBadge>
          <span className="demo-data-chip">Simulated Demo Data</span>
        </div>
      </section>

      <div className="crowd-grid">
        <section className="panel crowd-control-panel" aria-labelledby="crowd-control-title">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Zone Selection</p>
              <h2 id="crowd-control-title">Crowd Operations Console</h2>
            </div>
          </div>

          <form
            className="planner-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleAnalyzeCrowd();
            }}
          >
            <label>
              <span>Active Zone</span>
              <select
                value={selectedZone}
                onChange={(event) => {
                  setSelectedZone(event.target.value as StadiumLocation);
                  reset();
                }}
              >
                {CROWD_ZONES.map((zone) => (
                  <option value={zone.name} key={zone.name}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="workflow-strip" aria-label="Crowd intelligence workflow">
              <span>Simulated Crowd Data</span>
              <span>Deterministic Density Calculation</span>
              <span>Risk Classification</span>
              <span>AI-Assisted Operational Recommendation</span>
            </div>

            <p className="field-helper">
              AI recommendations are decision-support guidance based on simulated
              demo data. Final operational decisions remain with authorized
              stadium personnel.
            </p>

            <button className="primary-action" type="submit" disabled={loading}>
              {loading ? "Analyzing Crowd..." : "Analyze Crowd with AI"}
            </button>
          </form>
        </section>

        <section className="panel crowd-metrics-panel" aria-labelledby="crowd-metrics-title">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Simulated Demo Data</p>
              <h2 id="crowd-metrics-title">{activeZone.name}</h2>
            </div>
            <span className={`risk-pill risk-pill--${riskLevel.toLowerCase()}`}>
              {riskLevel}
            </span>
          </div>

          <div className="crowd-metric-grid">
            <article className="crowd-metric-card">
              <span>Current Occupancy</span>
              <strong>{activeZone.occupancy.toLocaleString()}</strong>
            </article>
            <article className="crowd-metric-card">
              <span>Zone Capacity</span>
              <strong>{activeZone.capacity.toLocaleString()}</strong>
            </article>
            <article className="crowd-metric-card">
              <span>Crowd Density</span>
              <strong>{density}%</strong>
            </article>
            <article className="crowd-metric-card">
              <span>Risk Level</span>
              <strong>{riskLevel}</strong>
            </article>
          </div>
        </section>

        {hasResponseState && (
          <ResponsePanel
            title="AI Operational Recommendation"
            className="crowd-recommendation"
            result={recommendation}
            loading={loading}
            error={error}
            loadingMessage="Analyzing simulated crowd data with stadium context..."
            langCode="en-US"
            groundingSource="Grounded in: Zone Density & Capacity Limits • Simulated Demo Data"
          />
        )}

        {hasResponseState && (
          <aside className="panel context-panel" aria-labelledby="crowd-context-title">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Request Context</p>
                <h2 id="crowd-context-title">Current AI Context</h2>
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
                <dd>Crowd</dd>
              </div>
              <div>
                <dt>Selected Zone</dt>
                <dd>{selectedZone}</dd>
              </div>
            </dl>
          </aside>
        )}
      </div>
    </main>
  );
}

export default CrowdPage;
