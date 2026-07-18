import { useEffect, useRef, useState } from "react";
import RoleCard from "../components/onboarding/RoleCard";
import { useRole } from "../context/useRole";
import type { StadiumRole } from "../types/role";

interface RoleSelectionPageProps {
  onContinue: () => void;
}

function RoleSelectionPage({ onContinue }: RoleSelectionPageProps) {
  const { role, roles, selectRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<StadiumRole>(
    role ?? roles[0],
  );
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (!hasInteractedRef.current) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 560px)").matches;

    if (!isMobile) {
      return;
    }

    window.requestAnimationFrame(() => {
      continueButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [selectedRole]);

  const handleContinue = () => {
    selectRole(selectedRole.value);
    onContinue();
  };

  const handleSelectRole = (nextRole: StadiumRole) => {
    hasInteractedRef.current = true;
    setSelectedRole(nextRole);
  };

  return (
    <main className="onboarding-page role-selection-page">
      <section className="role-selection-panel" aria-labelledby="role-title">
        <div className="role-selection-header">
          <p className="eyebrow">Role Calibration</p>
          <h1 id="role-title">How are you experiencing the stadium today?</h1>
          <p>
            Choose a mode to personalize the command center. This is not an
            account or authentication step.
          </p>
        </div>

        <div className="role-grid" role="list" aria-label="Stadium role options">
          {roles.map((availableRole) => (
            <RoleCard
              key={availableRole.value}
              role={availableRole}
              selected={selectedRole.value === availableRole.value}
              onSelect={handleSelectRole}
            />
          ))}
        </div>

        <div className="role-selection-footer">
          <button
            ref={continueButtonRef}
            className="primary-action"
            type="button"
            onClick={handleContinue}
          >
            Continue as {selectedRole.label}
          </button>
        </div>
      </section>
    </main>
  );
}

export default RoleSelectionPage;
