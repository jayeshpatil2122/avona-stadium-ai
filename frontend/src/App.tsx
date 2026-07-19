import { lazy, Suspense, useMemo, useState } from "react";
import AppShell, { type AppView } from "./components/layout/AppShell";
import RoleProvider from "./context/RoleProvider";
import { useRole } from "./context/useRole";
import DashboardPage from "./pages/DashboardPage";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import WelcomePage from "./pages/WelcomePage";
import "./styles/app.css";

const NavigationPage = lazy(() => import("./pages/NavigationPage"));
const CrowdPage = lazy(() => import("./pages/CrowdPage"));
const OperationsPage = lazy(() => import("./pages/OperationsPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const MultilingualPage = lazy(() => import("./pages/MultilingualPage"));

type OnboardingStep = "welcome" | "role" | "app";

function AppExperience() {
  const { role, clearRole } = useRole();
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(
    role ? "app" : "welcome",
  );
  const [activeView, setActiveView] = useState<AppView>("dashboard");

  const headerCopy = useMemo(() => {
    if (activeView === "navigation") {
      return {
        title: "Navigation Intelligence",
        eyebrow: "Verified Stadium Routing",
      };
    }

    if (activeView === "multilingual") {
      return {
        title: "Multilingual Intelligence",
        eyebrow: "AI-Powered Stadium Translation",
      };
    }

    if (activeView === "crowd") {
      return {
        title: "Crowd Intelligence",
        eyebrow: "AI-Assisted Crowd Operations",
      };
    }

    if (activeView === "operations") {
      return {
        title: "Operations Intelligence",
        eyebrow: "AI-Assisted Operational Decision Support",
      };
    }

    if (activeView === "accessibility") {
      return {
        title: "Accessibility Intelligence",
        eyebrow: "Need-Based Inclusive Assistance",
      };
    }

    return {
      title: "Command Center",
      eyebrow: "AI-Powered Stadium Operations Platform",
    };
  }, [activeView]);

  if (onboardingStep === "welcome") {
    return <WelcomePage onEnter={() => setOnboardingStep("role")} />;
  }

  if (onboardingStep === "role" || !role) {
    return <RoleSelectionPage onContinue={() => setOnboardingStep("app")} />;
  }

  const handleSwitchRole = () => {
    clearRole();
    setActiveView("dashboard");
    setOnboardingStep("role");
  };

  return (
    <AppShell
      activeView={activeView}
      title={headerCopy.title}
      eyebrow={headerCopy.eyebrow}
      roleModeLabel={role.modeLabel}
      onNavigate={setActiveView}
      onSwitchRole={handleSwitchRole}
      onGoWelcome={() => setOnboardingStep("welcome")}
    >
      <Suspense
        fallback={
          <div className="loading-state page-loading" role="status" aria-live="polite">
            <span className="loader" aria-hidden="true" />
            <p>Loading stadium intelligence...</p>
          </div>
        }
      >
        {activeView === "navigation" ? (
          <NavigationPage role={role} />
        ) : activeView === "crowd" ? (
          <CrowdPage role={role} />
        ) : activeView === "operations" ? (
          <OperationsPage role={role} />
        ) : activeView === "accessibility" ? (
          <AccessibilityPage role={role} />
        ) : activeView === "multilingual" ? (
          <MultilingualPage role={role} />
        ) : (
          <DashboardPage
            role={role}
            onOpenNavigation={() => setActiveView("navigation")}
            onOpenCrowd={() => setActiveView("crowd")}
            onOpenOperations={() => setActiveView("operations")}
            onOpenAccessibility={() => setActiveView("accessibility")}
            onOpenMultilingual={() => setActiveView("multilingual")}
          />
        )}
      </Suspense>
    </AppShell>
  );
}

function App() {
  return (
    <RoleProvider>
      <AppExperience />
    </RoleProvider>
  );
}

export default App;
