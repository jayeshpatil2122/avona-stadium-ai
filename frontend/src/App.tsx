import { useMemo, useState } from "react";
import AppShell, { type AppView } from "./components/layout/AppShell";
import DashboardPage from "./pages/DashboardPage";
import NavigationPage from "./pages/NavigationPage";
import "./styles/app.css";

function App() {
  const [activeView, setActiveView] = useState<AppView>("dashboard");

  const headerCopy = useMemo(() => {
    if (activeView === "navigation") {
      return {
        title: "Navigation Intelligence",
        eyebrow: "Verified Stadium Routing",
      };
    }

    return {
      title: "Command Center",
      eyebrow: "AI-Powered Stadium Operations Platform",
    };
  }, [activeView]);

  return (
    <AppShell
      activeView={activeView}
      title={headerCopy.title}
      eyebrow={headerCopy.eyebrow}
      onNavigate={setActiveView}
    >
      {activeView === "navigation" ? (
        <NavigationPage />
      ) : (
        <DashboardPage onOpenNavigation={() => setActiveView("navigation")} />
      )}
    </AppShell>
  );
}

export default App;
