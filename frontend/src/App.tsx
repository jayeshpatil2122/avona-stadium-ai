import { useMemo, useState } from "react";
import AppShell, { type AppView } from "./components/layout/AppShell";
import RoleProvider from "./context/RoleProvider";
import { useRole } from "./context/useRole";
import CrowdPage from "./pages/CrowdPage";
import DashboardPage from "./pages/DashboardPage";
import MultilingualPage from "./pages/MultilingualPage";
import NavigationPage from "./pages/NavigationPage";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import WelcomePage from "./pages/WelcomePage";
import "./styles/app.css";

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
      {activeView === "navigation" ? (
        <NavigationPage role={role} />
      ) : activeView === "crowd" ? (
        <CrowdPage role={role} />
      ) : activeView === "multilingual" ? (
        <MultilingualPage role={role} />
      ) : (
        <DashboardPage
          role={role}
          onOpenNavigation={() => setActiveView("navigation")}
          onOpenCrowd={() => setActiveView("crowd")}
          onOpenMultilingual={() => setActiveView("multilingual")}
        />
      )}
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
