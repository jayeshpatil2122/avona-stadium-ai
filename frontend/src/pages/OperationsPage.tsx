import { useMemo, useState } from "react";
import StatusBadge from "../components/common/StatusBadge";
import ResponsePanel from "../components/common/ResponsePanel";
import { useAIRequest } from "../hooks/useAIRequest";
import { STADIUM_LOCATIONS, STADIUM_NAME, type StadiumLocation } from "../constants/stadium";
import type { StadiumRole } from "../types/role";

interface OperationsPageProps {
  role: StadiumRole;
}

type SeverityLevel = "critical" | "high" | "medium" | "low";

interface OperationsIncidentData {
  category: string;
  severity: SeverityLevel;
  situation: string;
  recommendedActions: string[];
}

const incidentOptions = [
  { value: "crowd", label: "Crowd Pressure", description: "Concourse congestion or entrance pressure." },
  { value: "medical", label: "Medical Assistance", description: "Emergency medical support request." },
  { value: "accessibility", label: "Accessibility Assistance", description: "Mobility support or barrier resolution." },
  { value: "facility", label: "Facility Issue", description: "Maintenance, power, or utility issue." },
  { value: "normal", label: "Normal Operations", description: "Routine monitoring, all systems operational." },
] as const;

type IncidentType = (typeof incidentOptions)[number]["value"];

const simulatedIncidents: Record<string, Partial<Record<IncidentType, OperationsIncidentData>>> = {
  "North Concourse": {
    crowd: {
      category: "Crowd Control",
      severity: "critical",
      situation: "High crowd density detected.",
      recommendedActions: [
        "Redirect incoming fan flow.",
        "Deploy additional crowd-management staff.",
        "Monitor adjacent concourses.",
        "Temporarily restrict additional entry if required.",
      ],
    },
  },
  "Central Plaza": {
    medical: {
      category: "Medical Help",
      severity: "high",
      situation: "Medical assistance requested.",
      recommendedActions: [
        "Dispatch nearest available medical team.",
        "Keep access route clear.",
        "Direct nearby staff to support crowd clearance.",
      ],
    },
  },
  "Gate B": {
    accessibility: {
      category: "Accessibility Support",
      severity: "medium",
      situation: "Visitor requires mobility assistance.",
      recommendedActions: [
        "Dispatch accessibility support staff.",
        "Use verified accessible route.",
        "Avoid congested route where possible.",
      ],
    },
  },
  "East Concourse": {
    facility: {
      category: "Facility Maintenance",
      severity: "medium",
      situation: "Facility availability issue reported.",
      recommendedActions: [
        "Dispatch venue maintenance staff.",
        "Redirect visitors to alternative verified facility.",
        "Monitor issue status.",
      ],
    },
  },
  "Main Entrance": {
    normal: {
      category: "Normal Operations",
      severity: "low",
      situation: "No significant operational incident detected.",
      recommendedActions: [
        "Continue routine monitoring.",
        "Maintain normal staffing.",
      ],
    },
  },
};

function OperationsPage({ role }: OperationsPageProps) {
  const [location, setLocation] = useState<StadiumLocation>("North Concourse");
  const [incidentType, setIncidentType] = useState<IncidentType>("crowd");
  const { response, loading, error, execute, reset } = useAIRequest();
  const decisionSupport = response?.response ?? "";

  const activeIncident = useMemo(() => {
    return simulatedIncidents[location]?.[incidentType] ?? null;
  }, [location, incidentType]);

  const hasResponseState = loading || Boolean(error) || Boolean(decisionSupport);

  const handleAnalyze = () => {
    const prompt = activeIncident
      ? `Analyze the incident "${activeIncident.situation}" at ${location} with severity ${activeIncident.severity.toUpperCase()}. Recommend key operational steps.`
      : `Verify the operational situation at ${location} for category ${incidentType}. Recommend default monitoring steps.`;

    void execute(
      {
        module: "operations",
        user_role: role.value,
        language: "English",
        stadium: STADIUM_NAME,
        location,
        destination: null,
        incident_type: incidentType,
        prompt,
      },
      "Unable to analyze the operational situation. Please try again.",
    );
  };

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case "critical":
        return <span className="risk-pill risk-pill--critical">🛑 Critical</span>;
      case "high":
        return <span className="risk-pill risk-pill--high">⚠️ High</span>;
      case "medium":
        return <span className="risk-pill risk-pill--moderate">⚡ Medium</span>;
      default:
        return <span className="risk-pill risk-pill--low">✅ Low</span>;
    }
  };

  return (
    <main className="operations-page">
      <section className="navigation-hero" aria-labelledby="operations-title">
        <div>
          <p className="eyebrow">Real-Time Decision Support</p>
          <h2 id="operations-title">Operational Intelligence</h2>
          <p>
            Monitor simulated match-day incidents, review deterministic priority rules,
            and generate AI-assisted venue operations recommendations.
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
        <section className="panel crowd-control-panel" aria-labelledby="operations-control-title">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Incident Selection</p>
              <h2 id="operations-control-title">Operations Console</h2>
            </div>
          </div>

          <form
            className="planner-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleAnalyze();
            }}
          >
            <label>
              <span>Current Location</span>
              <select
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value as StadiumLocation);
                  reset();
                }}
              >
                {STADIUM_LOCATIONS.map((loc) => (
                  <option value={loc} key={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="assistance-fieldset">
              <legend>Incident / Situation Type</legend>
              <div className="assistance-option-grid">
                {incidentOptions.map((option) => (
                  <label className="assistance-option" key={option.value}>
                    <input
                      type="radio"
                      name="incidentType"
                      value={option.value}
                      checked={incidentType === option.value}
                      onChange={() => {
                        setIncidentType(option.value);
                        reset();
                      }}
                    />
                    <span className="assistance-option__body">
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                      {incidentType === option.value && (
                        <span className="assistance-option__selected">Selected</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="workflow-strip" aria-label="Operations intelligence workflow">
              <span>Deterministic Registry Data</span>
              <span>Priority Severity Check</span>
              <span>AI Decision Recommendations</span>
            </div>

            <p className="field-helper">
              All incident details and priorities are loaded from the deterministic venue registry.
              AI provides explanation and procedural support based on simulated data.
            </p>

            <button className="primary-action" type="submit" disabled={loading}>
              {loading ? "Analyzing Operations..." : "Analyze Operational Situation"}
            </button>
          </form>
        </section>

        <div className="crowd-metrics-column">
          <section className="panel crowd-metrics-panel" aria-labelledby="operations-metrics-title">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Deterministic Registry State</p>
                <h2 id="operations-metrics-title">{location}</h2>
              </div>
              {activeIncident ? (
                getSeverityBadge(activeIncident.severity)
              ) : (
                <span className="risk-pill risk-pill--low">✅ Clear</span>
              )}
            </div>

            {activeIncident ? (
              <div className="metrics-summary">
                <div className="metric-box">
                  <span className="metric-box__label">Incident Category</span>
                  <strong>{activeIncident.category}</strong>
                </div>
                <div className="metric-box">
                  <span className="metric-box__label">Severity Classification</span>
                  <strong style={{ textTransform: "capitalize" }}>{activeIncident.severity}</strong>
                </div>
                <div className="metric-box" style={{ gridColumn: "span 2" }}>
                  <span className="metric-box__label">Situation Details</span>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.95rem" }}>
                    {activeIncident.situation}
                  </p>
                </div>
                <div className="metric-box" style={{ gridColumn: "span 2" }}>
                  <span className="metric-box__label">Standard Operating Actions</span>
                  <ul style={{ margin: "0.5rem 0 0 0", paddingLeft: "1.25rem", fontSize: "0.9rem" }}>
                    {activeIncident.recommendedActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="metrics-summary">
                <div className="metric-box" style={{ gridColumn: "span 2" }}>
                  <span className="metric-box__label">Operations Status</span>
                  <strong>Normal Operations / No Incidents</strong>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    No critical issues reported. Continue routine match-day surveillance and monitor surrounding gates.
                  </p>
                </div>
              </div>
            )}
          </section>

          {hasResponseState && (
            <ResponsePanel
              title="AI Decision Support"
              className="translation-result"
              result={decisionSupport}
              loading={loading}
              error={error}
              loadingMessage="Generating operational decision support..."
              langCode="en-US"
              groundingSource="Grounded in: Deterministic Incident Matrix • Simulated Scenario Data"
            />
          )}

          {hasResponseState && (
            <aside className="panel context-panel" aria-labelledby="operations-context-title">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Request Context</p>
                  <h2 id="operations-context-title">Current AI Context</h2>
                </div>
              </div>
              <dl>
                <div>
                  <dt>User Role</dt>
                  <dd>{role.label}</dd>
                </div>
                <div>
                  <dt>Incident Type</dt>
                  <dd style={{ textTransform: "capitalize" }}>{incidentType}</dd>
                </div>
                <div>
                  <dt>Stadium</dt>
                  <dd>{STADIUM_NAME}</dd>
                </div>
                <div>
                  <dt>Module</dt>
                  <dd>Operations</dd>
                </div>
              </dl>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}

export default OperationsPage;
