import { useMemo, useState } from "react";
import StatusBadge from "../components/common/StatusBadge";
import ResponsePanel from "../components/common/ResponsePanel";
import { useAIRequest } from "../hooks/useAIRequest";
import {
  STADIUM_LOCATIONS,
  STADIUM_NAME,
  type StadiumLocation,
} from "../constants/stadium";
import type { StadiumRole } from "../types/role";

interface AccessibilityPageProps {
  role: StadiumRole;
}

type AssistanceType =
  | "wheelchair_access"
  | "accessible_toilet"
  | "accessible_seating"
  | "medical_assistance"
  | "visual_assistance"
  | "hearing_assistance"
  | "reduced_mobility";

interface AssistanceOption {
  value: AssistanceType;
  label: string;
  description: string;
  prompt: string;
}

const assistanceOptions: AssistanceOption[] = [
  {
    value: "wheelchair_access",
    label: "Wheelchair Access",
    description: "Mobility support, accessible paths, and wheelchair-friendly assistance.",
    prompt: "I use a wheelchair and need accessibility assistance.",
  },
  {
    value: "accessible_toilet",
    label: "Accessible Toilet",
    description: "Verified demo restroom facility guidance.",
    prompt: "I need to find an accessible toilet. Please help me.",
  },
  {
    value: "accessible_seating",
    label: "Accessible Seating",
    description: "Support for accessible seating and companion assistance.",
    prompt: "I need accessible seating assistance. Please guide me.",
  },
  {
    value: "medical_assistance",
    label: "Medical Assistance",
    description: "Route support to the appropriate medical assistance point.",
    prompt: "I need medical assistance. Help me reach the appropriate facility.",
  },
  {
    value: "visual_assistance",
    label: "Visual Assistance",
    description: "Clear guidance for fans who need visual navigation support.",
    prompt: "I need visual navigation assistance. Please provide clear guidance.",
  },
  {
    value: "hearing_assistance",
    label: "Hearing Assistance",
    description: "Support point guidance for hearing accessibility needs.",
    prompt: "I need hearing accessibility assistance. Please help me.",
  },
  {
    value: "reduced_mobility",
    label: "Reduced Mobility",
    description: "Assistance for elderly fans or visitors with reduced mobility.",
    prompt: "I have reduced mobility and need assistance reaching a suitable support point.",
  },
];

function AccessibilityPage({ role }: AccessibilityPageProps) {
  const [assistanceType, setAssistanceType] =
    useState<AssistanceType>("accessible_toilet");
  const [location, setLocation] = useState<StadiumLocation>("Main Entrance");
  const [request, setRequest] = useState(
    "I need to find an accessible toilet. Please help me.",
  );
  const { response, loading, error, execute, reset, setError } = useAIRequest();
  const guidance = response?.response ?? "";

  const selectedOption = useMemo(
    () =>
      assistanceOptions.find((option) => option.value === assistanceType) ??
      assistanceOptions[0],
    [assistanceType],
  );
  const hasResponseState = loading || Boolean(error) || Boolean(guidance);

  const handleAssistanceChange = (value: AssistanceType) => {
    const nextOption =
      assistanceOptions.find((option) => option.value === value) ??
      assistanceOptions[0];

    setAssistanceType(value);
    setRequest(nextOption.prompt);
    reset();
  };

  const handleGenerateGuidance = async () => {
    const trimmedRequest = request.trim();

    if (!trimmedRequest) {
      setError("Enter an accessibility request before generating guidance.");
      return;
    }

    void execute(
      {
        module: "accessibility",
        user_role: "fan",
        language: "English",
        stadium: STADIUM_NAME,
        location,
        destination: null,
        assistance_type: assistanceType,
        prompt: trimmedRequest,
      },
      "Unable to generate accessibility guidance. Please try again.",
    );
  };

  return (
    <main className="accessibility-page">
      <section className="navigation-hero" aria-labelledby="accessibility-title">
        <div>
          <p className="eyebrow">Accessibility Intelligence</p>
          <h2 id="accessibility-title">Need-Based Inclusive Assistance</h2>
          <p>
            Find verified demo accessibility facilities, assistance points, and
            route guidance based on individual stadium accessibility needs.
          </p>
        </div>
        <div className="crowd-hero-status">
          <StatusBadge tone="operational" pulse>
            Operational
          </StatusBadge>
          <span className="demo-data-chip">Verified Demo Accessibility Data</span>
        </div>
      </section>

      <div className="accessibility-grid">
        <section className="panel accessibility-planner" aria-labelledby="accessibility-form-title">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Assistance Request</p>
              <h2 id="accessibility-form-title">Inclusive Guidance Console</h2>
            </div>
          </div>

          <form
            className="planner-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleGenerateGuidance();
            }}
          >
            <fieldset className="assistance-fieldset">
              <legend>Accessibility Need</legend>
              <div className="assistance-option-grid">
                {assistanceOptions.map((option) => (
                  <label className="assistance-option" key={option.value}>
                    <input
                      type="radio"
                      name="assistanceType"
                      value={option.value}
                      checked={assistanceType === option.value}
                      onChange={() => handleAssistanceChange(option.value)}
                    />
                    <span className="assistance-option__body">
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                      {assistanceType === option.value && (
                        <span className="assistance-option__selected">Selected</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label>
              <span>Current Location</span>
              <select
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value as StadiumLocation);
                  reset();
                }}
              >
                {STADIUM_LOCATIONS.map((stadiumLocation) => (
                  <option value={stadiumLocation} key={stadiumLocation}>
                    {stadiumLocation}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>User Request</span>
              <textarea
                value={request}
                onChange={(event) => {
                  setRequest(event.target.value);
                  if (error) {
                    setError("");
                  }
                }}
                rows={5}
                aria-describedby="accessibility-request-helper"
              />
            </label>

            <p className="field-helper" id="accessibility-request-helper">
              Accessibility guidance is AI-assisted and based on verified demo
              facility and route data. For urgent, safety-critical, or additional
              assistance, contact authorized stadium personnel.
            </p>

            <button className="primary-action" type="submit" disabled={loading}>
              {loading ? "Generating Guidance..." : "Get Accessibility Assistance"}
            </button>
          </form>
        </section>

        <aside className="panel accessibility-context" aria-labelledby="accessibility-context-title">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Verified Demo Flow</p>
              <h2 id="accessibility-context-title">How Guidance Is Formed</h2>
            </div>
          </div>

          <div className="workflow-strip" aria-label="Accessibility intelligence workflow">
            <span>Accessibility Need</span>
            <span>Verified Demo Facility Lookup</span>
            <span>Recommended Assistance Point</span>
            <span>Verified Route</span>
            <span>AI-Personalized Inclusive Guidance</span>
          </div>

          <dl className="accessibility-summary">
            <div>
              <dt>Selected Need</dt>
              <dd>{selectedOption.label}</dd>
            </div>
            <div>
              <dt>Current Location</dt>
              <dd>{location}</dd>
            </div>
            <div>
              <dt>Data Scope</dt>
              <dd>Demo stadium facilities only</dd>
            </div>
          </dl>
        </aside>

        {hasResponseState && (
          <ResponsePanel
            title="AI Accessibility Guidance"
            className="accessibility-result"
            result={guidance}
            loading={loading}
            error={error}
            loadingMessage="Checking verified demo accessibility data..."
            langCode="en-US"
            groundingSource="Grounded in: Inclusive Needs Facility Lookup • Verified Demo Data"
          />
        )}

        {hasResponseState && (
          <aside className="panel context-panel" aria-labelledby="accessibility-request-context-title">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Request Context</p>
                <h2 id="accessibility-request-context-title">Current AI Context</h2>
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
                <dd>Accessibility</dd>
              </div>
              <div>
                <dt>Backend Value</dt>
                <dd>{assistanceType}</dd>
              </div>
            </dl>
          </aside>
        )}
      </div>
    </main>
  );
}

export default AccessibilityPage;
